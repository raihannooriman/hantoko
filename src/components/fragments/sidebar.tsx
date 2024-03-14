type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  return (
    <div className="bg-black text-white p-5 w-60 h-screen">
      <div className="">
        <h1 className="text-2xl text-bold">Admin Panel</h1>
        {lists.map((list, index) => (
          <div key={list.title}>
            <h4>{list.title}</h4>
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
};
export default Sidebar;
