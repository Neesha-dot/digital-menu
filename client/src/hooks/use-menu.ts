import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// ============================================
// DATA HOOKS
// ============================================

export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

export function useItems(filters?: { categoryId?: number; isVeg?: boolean; featured?: boolean; search?: string }) {
  // Only construct query params if filters exist
  const queryKey = [api.items.list.path, filters];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      let url = api.items.list.path;
      if (filters) {
        const params = new URLSearchParams();
        if (filters.categoryId !== undefined) params.append("categoryId", String(filters.categoryId));
        if (filters.isVeg !== undefined) params.append("isVeg", String(filters.isVeg));
        if (filters.featured !== undefined) params.append("featured", String(filters.featured));
        if (filters.search) params.append("search", filters.search);
        url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch items");
      return api.items.list.responses[200].parse(await res.json());
    },
  });
}

export function useItem(id: number) {
  return useQuery({
    queryKey: [api.items.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.items.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch item");
      return api.items.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
