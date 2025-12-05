import { getAllCategories } from "@/sanity/lib";
import { CategoryList } from "./category-list";

export async function CategoryGrid() {
  const categories = await getAllCategories();

  return <CategoryList categories={categories} />;
}

