import React, { useState, useEffect } from "react";
import { useMockAuth } from "@/components/auth/MockAuthProvider";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Shield, User, UserX } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserData {
  id: string;
  email: string;
  user_metadata: {
    name: string;
  };
  app_metadata: {
    is_admin: boolean;
  };
}

const UserManagement = () => {
  const { user } = useMockAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if current user is admin
  const isAdmin = user?.app_metadata?.is_admin === true;

  useEffect(() => {
    if (!isAdmin) return;

    // Load all users from localStorage
    loadUsers();
  }, [isAdmin]);

  const loadUsers = () => {
    const userList: UserData[] = [];

    // Get all keys from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key === "mockUser" || key.startsWith("user_"))) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || "");
          userList.push(userData);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    }

    setUsers(userList);
  };

  const handleRoleChange = (userId: string, makeAdmin: boolean) => {
    // Find the user in our list
    const userToUpdate = users.find((u) => u.id === userId);
    if (!userToUpdate) return;

    // Update the user's admin status
    userToUpdate.app_metadata.is_admin = makeAdmin;

    // Save back to localStorage
    const storageKey =
      userToUpdate.email === "mvdbaart@gmail.com"
        ? "mockUser"
        : `user_${userToUpdate.email}`;

    localStorage.setItem(storageKey, JSON.stringify(userToUpdate));

    // Update our state
    setUsers(users.map((u) => (u.id === userId ? userToUpdate : u)));

    // Show success message
    setSuccessMessage(
      `User ${userToUpdate.email} is now ${makeAdmin ? "an admin" : "a regular user"}.`,
    );
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting the main admin
    const userToDelete = users.find((u) => u.id === userId);
    if (!userToDelete || userToDelete.email === "mvdbaart@gmail.com") {
      setError("Cannot delete the main admin account.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Remove from localStorage
    localStorage.removeItem(`user_${userToDelete.email}`);

    // Update our state
    setUsers(users.filter((u) => u.id !== userId));

    // Show success message
    setSuccessMessage(`User ${userToDelete.email} has been deleted.`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (!isAdmin) {
    return (
      <DashboardLayout activePath="/admin/users">
        <div className="container mx-auto py-8 px-4">
          <Alert variant="destructive">
            <AlertDescription>
              You don't have permission to access this page. Only administrators
              can manage users.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activePath="/admin/users">
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-600">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                          />
                          <AvatarFallback>
                            {user.user_metadata.name
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>{user.user_metadata.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.app_metadata.is_admin ? "default" : "outline"
                        }
                      >
                        {user.app_metadata.is_admin ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.app_metadata.is_admin ? (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user.id, false)}
                              disabled={user.email === "mvdbaart@gmail.com"}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Make Regular User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(user.id, true)}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.email === "mvdbaart@gmail.com"}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
