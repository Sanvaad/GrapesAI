import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, User, Laptop, Mail, Phone, Globe } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="p-8 space-y-8 min-h-screen bg-[#0A0F1E] text-white">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Settings
        </h2>
        <p className="text-[#94A3B8]">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-[#141925] border border-[#1E2433] p-1 rounded-lg">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md"
          >
            <Laptop className="w-4 h-4 mr-2" />
            AI Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-[#141925] border-[#1E2433]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-[#94A3B8]">
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Dr. Smith"
                  className="bg-[#1E2433] border-[#2A3441] text-white placeholder:text-[#94A3B8]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@example.com"
                  className="bg-[#1E2433] border-[#2A3441] text-white placeholder:text-[#94A3B8]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-white">
                  Specialization
                </Label>
                <Select>
                  <SelectTrigger className="bg-[#1E2433] border-[#2A3441] text-white">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141925] border-[#1E2433]">
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-[#141925] border-[#1E2433]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-[#94A3B8]">
                Configure how you want to receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email Notifications",
                    id: "email-notif",
                  },
                  { icon: Phone, label: "SMS Alerts", id: "sms-alerts" },
                  {
                    icon: Globe,
                    label: "Browser Notifications",
                    id: "browser-notif",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between space-x-2"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-500/10 rounded-full">
                        <item.icon className="h-4 w-4 text-blue-500" />
                      </div>
                      <Label htmlFor={item.id} className="text-white">
                        {item.label}
                      </Label>
                    </div>
                    <Switch id={item.id} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Security and AI Settings tabs with similar styling */}
      </Tabs>
    </div>
  );
}

export default SettingsPage;
