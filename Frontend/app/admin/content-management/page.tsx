import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomepageEditor } from "./components/HomepageEditor"
import { BlogManagement } from "./components/BlogManagement"
import { FAQManagement } from "./components/FAQManagement"
import { MetaTagsEditor } from "./components/MetaTagsEditor"
import { SitemapManager } from "./components/SitemapManager"

export default function ContentManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-500 mt-2">Manage website content and optimize for search engines</p>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>
        <TabsContent value="homepage">
          <HomepageEditor />
        </TabsContent>
        <TabsContent value="blog">
          <BlogManagement />
        </TabsContent>
        <TabsContent value="faq">
          <FAQManagement />
        </TabsContent>
        <TabsContent value="meta">
          <MetaTagsEditor />
        </TabsContent>
        <TabsContent value="sitemap">
          <SitemapManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

