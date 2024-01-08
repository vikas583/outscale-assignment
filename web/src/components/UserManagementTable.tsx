import React, { useState } from "react";
import { CardFooter, Table } from 'reactstrap';
import Toastr from 'toastr';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { User, UserPermissions } from '../types';
import axiosClient from '../utils/axiosClient';
import AdminUserModal from './AdminUserModal';
import CustomPagination from './CustomPagination';

const UserManagementTable: React.FC<{
  resultsPerPage: number;
  total: number;
  currentPage: number;
  userData: User[];
  onPageChange: (page: number) => void;
}> = ({ currentPage, total, resultsPerPage, userData, onPageChange }) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { data: currentUserData } = useCurrentUser()

  const handleDelete = async (user: User) => {
    if (loading) return
    if (user.roles.includes(UserPermissions.admin)) {
      window.alert('Cannot delete admin user!')
      return
    }
    if (!window.confirm('Are you sure you want to delete?')) {
      return
    }
    try {
      setLoading(true)
      const resp = await axiosClient.request<boolean>({
        url: `admin/deleteUser`,
        method: 'DELETE',
        data: { id: user.id }
      })
      const respJson = resp.data
      if (!respJson) {
        throw new Error('invalid response from admin/deleteUser')
      }
      Toastr.success('User deleted!')
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      console.error(error)
      Toastr.error('Cannot delete user. Please contact admin!')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    if (!currentUserData || modalOpen) {
      return
    }
    if (user.email !== currentUserData.email && user.roles.includes(UserPermissions.admin)) {
      window.alert('You cannot edit other admins!')
      return
    }
    setSelectedUser(user)
    setModalOpen(true)
  }

  return (
    <>
      <AdminUserModal type="Edit" userData={selectedUser} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Table>
        <thead className="thead-light">
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            {/* <th>User ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Assigned Roles</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, i) => {
            return (
              <tr key={i}>
                <th>
                  <span className="text-sm" onClick={() => handleEdit(user)}>
                    <i className="fas fa-edit" />
                  </span>
                </th>
                <th>
                  <span className="text-sm" onClick={() => handleDelete(user)}>
                    <i className="fas fa-trash-alt" />
                  </span>
                </th>
                {/* <td>
                  <span className="text-sm">{user.id}</span>
                </td> */}
                <th>
                  <span className="text-sm">{user.name}</span>
                </th>
                <th>
                  <span className="text-sm">{user.email}</span>
                </th>
                <td>
                  <span className="text-sm">{user.roles.join(', ')}</span>
                </td>
              </tr>
            )
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
  )
}

export default UserManagementTable
