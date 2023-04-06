import { NavLink, Outlet } from "react-router-dom";

export const App = () => {
  const routeConfig = [
    {
      path: "/home",
      name: "首页",
    },
    {
      path: "/setting",
      name: "设置",
    },
  ];
  return (
    <div>
      <div>自己手动创建一个react项目</div>
      <div>
        {routeConfig.map((item) => {
          return (
            <NavLink to={item.path} key={item.name}>
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
