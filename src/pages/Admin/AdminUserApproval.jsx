import { useState, useEffect, useRef } from 'react';
import 'daisyui/dist/full.css';
import axios from 'axios';
import TableComponent from '../../components/LeavesTables/TableComponent';
import UserDetails from '../../components/Popups/UserDetails';
import { API_URL } from '../../App';

const header = 'User Approval';

const columns = [
  { field: 'userid', header: 'UserID' },
  { field: 'username', header: 'Username' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone Number' },
  { field: 'role', header: 'Role' },
];

const AdminUserApproval = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/get`);
        const users = Array.isArray(response.data) ? response.data : response.data.users;
        const filteredUsers = users.filter(user => user.role.RoleName === 'Unverified' || user.role.RoleName === 'Rejected');
        console.log(filteredUsers)
        const mappedUsers = filteredUsers.map(user => ({
          userid: user.UserID,
          username: user.Username,
          email: user.Email,
          phone: user.PhoneNumber,
          role: user.role.RoleName,
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDetailsClick = (user) => {
    setSelectedUser(user);
    setEditable(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditable(true);
  };

  const approveUser = async (userId, newRole) => {
    console.log(`Updating role for user ${userId} to ${newRole}`);
    try {
      const response = await axios.put(`${API_URL}/user/update_role/${userId}`, { RoleName: newRole });
      if (response.status === 200) {
        setUsers(prevUsers => 
          prevUsers
            .map(user => user.userid === userId ? { ...user, role: newRole } : user)
            .filter(user => user.role === 'Unverified' || user.role === 'Rejected')
        );
      }
    } catch (error) {
      console.error('Error updating user role:', error);
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
    let roleName = rowData.role;
    let backgroundColor;
    let textColor;

    switch (roleName) {
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
      case "Unverified":
        backgroundColor = "#D4D4D4";
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
          <span>{roleName}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto w-full">
      <TableComponent
        data={users}
        header={header}
        columns={columns}
        ColorConfig={RoleBodyTemplate}
        admin={false}
        rows={10}
        depends='role'
        onDetailsClick={handleDetailsClick}
        onEditClick={handleEditClick}
      />
      {selectedUser && (
        <UserDetails
          ref={modalRef}
          userid={selectedUser.userid}
          username={selectedUser.username}
          phone={selectedUser.phone}
          email={selectedUser.email}
          role={selectedUser.role}
          approveUser={approveUser}
        />
      )}
    </div>
  );
};

export default AdminUserApproval;
