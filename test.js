package com.fincore.gateway.Service;

import com.fincore.gateway.dto.*;
import com.fincore.gateway.model.Permissions;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MenuService {

    public MenuResponse transform(List<Permissions> permissionsList) {
        MenuResponse response = new MenuResponse();

        // Group by root menuTitle
        Map<String, List<Permissions>> grouped = permissionsList.stream()
                .collect(Collectors.groupingBy(Permissions::getMenuTitle));

        List<RootMenu> rootMenus = new ArrayList<>();

        for (Map.Entry<String, List<Permissions>> entry : grouped.entrySet()) {
            List<Permissions> group = entry.getValue();
            Permissions rootPerm = group.get(0);

            RootMenu rootMenu = new RootMenu();
            rootMenu.setId(rootPerm.getMenuId());
            rootMenu.setTitle(rootPerm.getMenuTitle());
            rootMenu.setIcon(rootPerm.getMenuIcon());
            rootMenu.setRoute(rootPerm.getMenuUrl());
            rootMenu.setComponentPath(rootPerm.getComponentPath());
            rootMenu.setScreenDescription(rootPerm.getMenuDescription());
            rootMenu.setOrderId(rootPerm.getOrderId());

            if (group.size() > 1) {
                rootMenu.setHasChildren(true);

                // ✅ Sort children by orderId in ascending order
                List<ChildMenu> children = group.stream()
                        .filter(p -> p.getSubMenu() != null)
                        .map(MenuService::getChildMenu)
                        .sorted(Comparator.comparingInt(ChildMenu::getOrderId)) // ascending order
                        .collect(Collectors.toList());

                rootMenu.setChildren(children);
            } else {
                rootMenu.setHasChildren(false);
            }

            rootMenus.add(rootMenu);
        }

        // ✅ (Optional) Also sort root menus by orderId if needed
        rootMenus.sort(Comparator.comparingInt(RootMenu::getOrderId));

        response.setRoot_menus(rootMenus);
        return response;
    }

    @NotNull
    private static ChildMenu getChildMenu(Permissions p) {
        ChildMenu child = new ChildMenu();
        child.setId(p.getMenuId());
        child.setTitle(p.getSubMenu());
        child.setIcon(p.getMenuIcon());
        child.setRoute(p.getMenuUrl());
        child.setComponentPath(p.getComponentPath());
        child.setScreenDescription(p.getMenuDescription());
        child.setOrderId(p.getOrderId());
        return child;
    }
}