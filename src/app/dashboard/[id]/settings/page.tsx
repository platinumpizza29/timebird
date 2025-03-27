"use client";
// TODO:Add input field for payrate
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useTheme } from "next-themes";
import { useSession } from "~/lib/auth-client";

export default function SettingsPage() {
  const userData = useSession();

  const user = userData?.data?.user;

  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6 container max-w-6xl py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-96 grid-cols-2 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold">Profile</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update your personal information and how others see you on
                    the platform.
                  </p>
                </div>
                <div className="space-y-6 md:col-span-3">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={"/avatars/shadcn.jpg"}
                            alt="Avatar"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline">
                            Change
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          className="max-w-96"
                          id="name"
                          defaultValue={user?.name ?? ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        className="max-w-96"
                        type="email"
                        defaultValue={user?.email ?? ""}
                      />
                    </div>
                    <div>
                      <Button>Save changes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold">Appearance</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customize how the application looks on your device.
                  </p>
                </div>
                <div className="space-y-4 md:col-span-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Turn on dark mode to reduce eye strain and save battery.
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      defaultChecked
                      onChange={(e) =>
                        setTheme(
                          (e.target as HTMLInputElement).checked
                            ? "dark"
                            : "light"
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable animations and transitions throughout the
                        interface.
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="system">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure how you receive notifications and updates.
                  </p>
                </div>
                <div className="space-y-4 md:col-span-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email.
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">
                        Push notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device.
                      </p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and special offers.
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                  <div className="pt-4">
                    <Button>Save preferences</Button>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold">Privacy & Security</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your privacy settings and security preferences.
                  </p>
                </div>
                <div className="space-y-4 md:col-span-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">
                        Two-factor authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-log">Activity log</Label>
                      <p className="text-sm text-muted-foreground">
                        Keep track of your account activity.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View log
                    </Button>
                  </div>
                  <div className="pt-6">
                    <Button variant="destructive">Delete account</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
