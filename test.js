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

				List<ChildMenu> children = new ArrayList<>();
				for (Permissions p : group) {
					if (p.getSubMenu() != null) {
						ChildMenu child = getChildMenu(p);
						children.add(child);
					}
				}
				rootMenu.setChildren(children);
			} else {
				rootMenu.setHasChildren(false);
			}

			rootMenus.add(rootMenu);
		}

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
