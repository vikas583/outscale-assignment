import React, { useState } from "react";
import { CardFooter, Table } from "reactstrap";
import Toastr from "toastr";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Book, User, UserPermissions } from "../types";
import axiosClient from "../utils/axiosClient";
import CustomPagination from "./CustomPagination";

const BooksManagementTable: React.FC<{
  resultsPerPage: number;
  total: number;
  currentPage: number;
  bookData: Book[];
  onPageChange: (page: number) => void;
}> = ({ currentPage, total, resultsPerPage, bookData, onPageChange }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: currentUserData } = useCurrentUser();

  const handleDelete = async (user: User) => {
    if (loading) return;
    if (user.roles.includes(UserPermissions.admin)) {
      window.alert("Cannot delete admin user!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    try {
      setLoading(true);
      const resp = await axiosClient.request<boolean>({
        url: `admin/deleteUser`,
        method: "DELETE",
        data: { id: user.id },
      });
      const respJson = resp.data;
      if (!respJson) {
        throw new Error("invalid response from admin/deleteUser");
      }
      Toastr.success("User deleted!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      Toastr.error("Cannot delete user. Please contact admin!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    if (!currentUserData || modalOpen) {
      return;
    }
    if (
      user.email !== currentUserData.email &&
      user.roles.includes(UserPermissions.admin)
    ) {
      window.alert("You cannot edit other admins!");
      return;
    }
    setSelectedUser(user);
    setModalOpen(true);
  };

  return (
    <>
      <Table>
        <thead className="thead-light">
          <tr>
            <th>Book ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Is Published</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book, i) => {
            return (
              <tr key={i}>
                <td>
                  <span className="text-sm">{book.id}</span>
                </td>
                <th>
                  <span className="text-sm">{book.name}</span>
                </th>
                <th>
                  <span className="text-sm">{book.title}</span>
                </th>
                <td>
                  <span className="text-sm">{book.isPublish}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CardFooter className="py-4">
        <nav aria-label="...">
          <CustomPagination
            activePage={currentPage}
            totalResults={total}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </nav>
      </CardFooter>
    </>
  );
};

export default BooksManagementTable;
