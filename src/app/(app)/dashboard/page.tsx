import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentDashboard } from "@/components/app/dashboard/student-dashboard";
import { PmDashboard } from "@/components/app/dashboard/pm-dashboard";
import { AdminDashboard } from "@/components/app/dashboard/admin-dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
        <Tabs defaultValue="student" className="w-full">
            <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="pm">Project Manager</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="student" className="mt-4">
                <StudentDashboard />
            </TabsContent>
            <TabsContent value="pm" className="mt-4">
                <PmDashboard />
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
                <AdminDashboard />
            </TabsContent>
        </Tabs>
    </div>
  )
}
