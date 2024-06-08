import { useState, useEffect, useRef } from 'react';
import 'daisyui/dist/full.css';
import { animate, motion, useAnimationControls } from "framer-motion";
import TableComponent from '../../components/LeavesTables/TableComponent';
import UserDetails from '../../components/Popups/UserDetails';

const data = [
  { userid: "1", username: 'john_doe', email: 'john.doe@example.com', phone: '123-456-7890', role: "Centra" },
  { userid: "2", username: 'jane_smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: "Company" },
  { userid: "3", username: 'alexander_wang', email: 'alex.wang@example.com', phone: '456-789-0123', role: 'Harbor' },
  { userid: "4", username: 'emily_miller', email: 'emily.miller@example.com', phone: '789-012-3456', role: "Company" },
  { userid: "5", username: 'sarah_jones', email: 'sarah.jones@example.com', phone: '012-345-6789', role: "Centra" },
  { userid: "6", username: 'michael_brown', email: 'michael.brown@example.com', phone: '234-567-8901', role: "Harbor" },
  { userid: "7", username: 'olivia_wilson', email: 'olivia.wilson@example.com', phone: '567-890-1234', role: "Harbor" },
  { userid: "8", username: 'william_taylor', email: 'william.taylor@example.com', phone: '890-123-4567', role: "Company" },
  { userid: "9", username: 'ava_jackson', email: 'ava.jackson@example.com', phone: '345-678-9012', role: "Centra" },
  { userid: "10", username: 'ethan_thomas', email: 'ethan.thomas@example.com', phone: '678-901-2345', role: "Harbor" },
  { userid: "11", username: 'emma_white', email: 'emma.white@example.com', phone: '901-234-5678', role: "Centra" },
  { userid: "12", username: 'noah_clark', email: 'noah.clark@example.com', phone: '123-456-7890', role: "Company" },
  { userid: "13", username: 'mia_robinson', email: 'mia.robinson@example.com', phone: '987-654-3210', role: "Harbor" },
  { userid: "14", username: 'james_hall', email: 'james.hall@example.com', phone: '456-789-0123', role: "Company" },
];

const header = 'User Management';

const columns = [
  { field: 'username', header: 'Username' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone Number' },
  { field: 'role', header: 'Role' },
];

const AdminUserTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const modalRef = useRef(null);

  const handleDetailsClick = (user) => {
    setSelectedUser(user);
    setEditable(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditable(true);
  };

  const handleDeleteClick = (user) =>{
    
  }

  useEffect(() => {
    const dialog = modalRef.current;
    if (selectedUser && dialog) {
      dialog.showModal();
      console.log(selectedUser)
      dialog.addEventListener('close', () => {
        setSelectedUser(null); // Reset selectedUser when dialog is closed
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

  return (
    <div className="container mx-auto w-full">
      <TableComponent
        data={data}
        header={header}
        columns={columns}
        ColorConfig={RoleBodyTemplate}
        admin={true}
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
          editable={editable}
        />
       
      )}
    </div>
  );
};

export default AdminUserTable;
