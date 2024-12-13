"use client";

import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const axios1 = useAxios();
  const showToast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios1.get<User[]>("/api/users");
      setUsers(response.data);
    } catch (error) {
      showToast("error", "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (id: string, role: User["role"]) => {
    try {
      const response = await axios1.put<User>(`/api/users/${id}`, { role });
      showToast("success", `${response.data.name}'s role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      showToast("error", "Failed to update user role");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => updateUserRole(user._id, value as User["role"])}
                    defaultValue={user.role}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Normal User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
