import React, { useState } from "react";
import { Upload, PaintBucket, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BrandIdentityProps {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  onSave?: (data: BrandIdentityData) => void;
}

interface BrandIdentityData {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  fontFamily: string;
}

const BrandIdentity = ({
  logo = "https://api.dicebear.com/7.x/avataaars/svg?seed=brand",
  primaryColor = "#4f46e5",
  secondaryColor = "#10b981",
  domain = "yourbrand.reviewboost.com",
  onSave = () => {},
}: BrandIdentityProps) => {
  const [brandData, setBrandData] = useState<BrandIdentityData>({
    logo,
    primaryColor,
    secondaryColor,
    domain,
    fontFamily: "Inter",
  });

  const [activeTab, setActiveTab] = useState("logo");
  const [previewLogo, setPreviewLogo] = useState(logo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setBrandData((prev) => ({ ...prev, fontFamily: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewLogo(event.target.result as string);
          setBrandData((prev) => ({
            ...prev,
            logo: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave(brandData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Brand Identity</h2>

      <Tabs defaultValue="logo" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="logo" className="flex items-center gap-2">
            <Upload size={16} />
            Logo
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <PaintBucket size={16} />
            Colors & Fonts
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2">
            <Globe size={16} />
            Domain
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Upload</CardTitle>
              <CardDescription>
                Upload your brand logo. Recommended size: 512x512px. PNG or SVG
                with transparent background.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="Brand Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-500">
                      <Upload className="mx-auto h-10 w-10 mb-2" />
                      <p>No logo uploaded</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Upload Logo</Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Your logo will appear on review request emails, landing
                    pages, and widgets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors & Typography</CardTitle>
              <CardDescription>
                Set your brand colors and font to maintain consistent branding
                across all touchpoints.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: brandData.primaryColor }}
                      />
                      <Input
                        id="primary-color"
                        name="primaryColor"
                        type="text"
                        value={brandData.primaryColor}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: brandData.secondaryColor }}
                      />
                      <Input
                        id="secondary-color"
                        name="secondaryColor"
                        type="text"
                        value={brandData.secondaryColor}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select
                      value={brandData.fontFamily}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-6 p-4 border rounded-md">
                    <p className="text-sm mb-2">Preview:</p>
                    <div style={{ fontFamily: brandData.fontFamily }}>
                      <h4
                        className="font-bold"
                        style={{ color: brandData.primaryColor }}
                      >
                        Heading Text
                      </h4>
                      <p style={{ color: brandData.secondaryColor }}>
                        Secondary text example
                      </p>
                      <p className="text-gray-700">
                        Regular paragraph text with your selected font.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain Setup</CardTitle>
              <CardDescription>
                Configure a custom domain for your review collection pages and
                widgets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    name="domain"
                    type="text"
                    value={brandData.domain}
                    onChange={handleInputChange}
                    placeholder="yourbrand.reviewboost.com"
                  />
                  <p className="text-sm text-gray-500">
                    You can use a subdomain of reviewboost.com or set up your
                    own custom domain.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md border">
                  <h4 className="font-medium mb-2">
                    Custom Domain Instructions
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Register your domain with a domain registrar</li>
                    <li>
                      Add a CNAME record pointing to{" "}
                      <code className="bg-gray-200 px-1 py-0.5 rounded">
                        custom.reviewboost.com
                      </code>
                    </li>
                    <li>Verify domain ownership</li>
                    <li>Wait for DNS propagation (up to 48 hours)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default BrandIdentity;
