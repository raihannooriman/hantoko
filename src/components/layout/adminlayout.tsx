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
];
const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className="">
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};
export default AdminLayout;
