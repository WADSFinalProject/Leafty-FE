import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import TableComponent from '../../components/LeavesTables/TableComponent';
import UserDetails from '../../components/Popups/UserDetails';
import { API_URL } from '../../App';
import LoadingStatic from '@components/LoadingStatic';

const header = 'User Management';

const columns = [
  { field: 'username', header: 'Username' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone Number' },
  { field: 'role', header: 'Role' },
];

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * pageSize;
        console.log(`Fetching users: page ${currentPage}, pageSize ${pageSize}, skip ${skip}`);
        
        const { data } = await axios.get(`${API_URL}/user/get?skip=${skip}&limit=${pageSize}`);
        console.log('Received data:', data);
        
        const usersArray = Array.isArray(data) ? data : data.users;

        const filteredAndMappedUsers = usersArray
          .filter(user => user.role.RoleName !== 'Customer' && user.role.RoleName !== 'Rejected')
          .map(({ UserID, Username, Email, PhoneNumber, role }) => ({
            userid: UserID,
            username: Username,
            email: Email,
            phone: PhoneNumber,
            role: role.RoleName,
          }));

        console.log('Filtered and mapped users:', filteredAndMappedUsers);
        setUsers(filteredAndMappedUsers);
        setLoading(false);

        // Fetch total user count
        const countResponse = await axios.get(`${API_URL}/user/count`);
        console.log('Total users count:', countResponse.data);
        setTotalUsers(countResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize]);

  const handleDetailsClick = (user) => {
    setSelectedUser(user);
    setEditable(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditable(true);
  };

  const handleDelete = async (id) => {
    setSelectedUser(id);
    try {
      await axios.delete(`${API_URL}/user/delete/${id}`);
      setSelectedUser(null);
      setUsers(users.filter(user => user.userid !== id));
      setTotalUsers(prevTotal => prevTotal - 1);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    const dialog = modalRef.current;
    if (selectedUser && dialog) {
      dialog.showModal();
      dialog.addEventListener('close', () => {
        setSelectedUser(null);
      });
    }
  }, [selectedUser]);

  const RoleBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;

    switch (rowData.role) {
      case "Centra":
        backgroundColor = "rgba(15, 114, 117, 0.5)";
        textColor = "#000000";
        break;
      case "Harbor":
        backgroundColor = "rgba(192, 205, 48, 0.5)";
        textColor = "#000000";
        break;
      case "Company":
        backgroundColor = "rgba(148, 195, 179, 0.5)";
        textColor = "#000000";
        break;
      default:
        backgroundColor = "inherit";
        textColor = "#000000";
    }

    const dynamicWidth = "100px";
    const dynamicHeight = "35px";

    return (
      <div
        style={{
          backgroundColor,
          color: textColor,
          width: dynamicWidth,
          height: dynamicHeight
        }}
        className="flex items-center justify-center rounded-3xl overflow-hidden"
      >
        <div className="flex items-center">
          <span>{rowData.role}</span>
        </div>
      </div>
    );
  };

  const handlePageChange = (newPage) => {
    console.log('Page changed to:', newPage);
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingStatic />
    </div>;
  }

  return (
    <div className="container mx-auto w-full">
      <TableComponent
        data={users}
        header={header}
        columns={columns}
        ColorConfig={RoleBodyTemplate}
        admin={true}
        rows={pageSize}
        depends='role'
        onDetailsClick={handleDetailsClick}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
        totalRecords={totalUsers}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {selectedUser && (
        <UserDetails
          ref={modalRef}
          userid={selectedUser.userid}
          username={selectedUser.username}
          phone={selectedUser.phone}
          email={selectedUser.email}
          role={selectedUser.role}
          editable={editable}
        />
      )}
    </div>
  );
};

export default AdminUserTable;