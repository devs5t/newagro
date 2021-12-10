import { matchPath } from "react-router-dom";
import SidebarNavList from "./SidebarNavList";
import SidebarNavListItem from "./SidebarNavListItem";

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute, blockNumber } = props;
  const isDisabled =
    typeof page.disabled === "function"
      ? page.disabled(blockNumber)
      : page.disabled;
  const title =
    typeof page.title === "function" ? page.title(blockNumber) : page.title;

  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={title}
        badge={page.badge}
        open={!!open}
        title={title}
        href={page.href}
        disabled={isDisabled}
      >
        <SidebarNavList
          disabled={isDisabled}
          depth={depth + 1}
          pages={page.children}
        />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={title}
        badge={page.badge}
        title={title}
        disabled={isDisabled}
      />
    );
  }

  return items;
};

export default reduceChildRoutes;
