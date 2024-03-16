import Sidebar from "../fragments/sidebar";
type Proptypes = {
  children: React.ReactNode;
};
const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: "bxs-cart",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
];
const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full">{children}</div>
    </div>
  );
};
export default AdminLayout;
