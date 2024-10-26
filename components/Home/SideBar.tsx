import { useMyContext } from "@/app/context/MyContext";
import { UseMenuItems } from "@/hooks";
import { MENUARRPROPS, SUBMENU } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { UserOrLogin } from "./UserOrLogin";

const SideBar = () => {
  const router = useRouter();
  const { setSliderOpen } = useMyContext();
  const { isLoaded, user } = useUser();
  const asPath = usePathname();
  const { theme } = useTheme();
  const getThemeClasses = (lightClass: string, darkClass: string) => {
    return theme === "light" ? lightClass : darkClass;
  };
  const renderSubMenu = (subItem: SUBMENU, parentRoute: string) => {
    const isActive = asPath === subItem?.route;
    return (
      <li
        onClick={() => {
          router?.push(subItem?.route as string);
          setSliderOpen(false);
        }}
        key={subItem.name}
        className={`flex items-center gap-2 p-2.5 rounded-[0.6rem] cursor-pointer duration-300 font-medium text-lg text-gray-700 dark:text-gray-400
        ${isActive
            ? getThemeClasses("bg-gray-200", "bg-darkHoverBackground")
            : getThemeClasses(
              "hover:bg-gray-200",
              "hover:bg-darkHoverBackground"
            )
          }
      }
        `}
      >
        {subItem.icon}
        <p className="font-light tracking-wide">{subItem.name}</p>
      </li>
    );
  };

  const renderMenuItem = (item: MENUARRPROPS) => {
    const isActive = asPath === item.route;
    if (item.menus && item.item) {
      return (
        <div
          key={item.name}
          className={`flex flex-col gap-3 font-medium  text-gray-700 dark:text-gray-400`}
        >
          <p className={`pt-2 text-gray-700 dark:text-white`}>{item.name}</p>
          <ul className="flex flex-col  gap-1">
            {item.item.map((subItem: SUBMENU) =>
              renderSubMenu(subItem, item.route as string)
            )}
          </ul>
        </div>
      );
    }

    return (
      <ul
        onClick={() => {
          router?.push(item?.route as string);
          setSliderOpen(false);
        }}
        key={item.name}
        className={`flex items-center  bg-background gap-2 p-3  cursor-pointer rounded-[0.6rem] duration-300 font-medium 
         text-gray-700 dark:text-white
         ${isActive
            ? getThemeClasses("bg-gray-200", "bg-darkHoverBackground")
            : getThemeClasses(
              "hover:bg-gray-200",
              "hover:bg-darkHoverBackground"
            )
          }
        `}
      >
        {item.icon}
        <p>{item.name}</p>
      </ul>
    );
  };

  return (
    <aside
      className={` relative overflow-y-auto border-r z-20 border-[#ebe8e8] dark:border-[#272727]  justify-start flex flex-col bg-background w-full h-full`}
    >
      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {asPath === "/workflow" && <div className="flex pt-2  px-3 items-center gap-1">
          <UserOrLogin />
        </div>}
        <p className="w-full border-b border-[#ebe8e8] dark:border-[#272727]"></p>
      </div>
      <div className="m-3 flex flex-col gap-2 ">

        {isLoaded &&
          user?.id &&
          UseMenuItems().map((item: MENUARRPROPS) => renderMenuItem(item))}
      </div>
    </aside>
  );
};

export default SideBar;
