import AdminLayout from "@/components/layout/adminlayout";

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="py-10 px-14">
        <h1 className="font-bold">User Management</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </AdminLayout>
  );
};
export default AdminUsersPage;
