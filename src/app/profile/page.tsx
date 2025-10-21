import { users, courses } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Award } from "lucide-react";
import Link from 'next/link';

export default function ProfilePage() {
  const user = users[0];
  const enrolledCourses = user.enrolledCourses.map(courseId => 
    courses.find(c => c.id === courseId)
  ).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 animate-fade-in">
      <Card className="mb-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="mt-2 max-w-prose">{user.bio}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline">Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" defaultValue={user.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Textarea id="bio" defaultValue={user.bio} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit">Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Enrolled Courses</CardTitle>
            <CardDescription>Your active and completed courses.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {enrolledCourses.map(course => course && (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary">
                            <img src={course.image.imageUrl} alt={course.title} data-ai-hint={course.image.imageHint} className="w-20 h-14 object-cover rounded-md" />
                            <div>
                                <h4 className="font-semibold">{course.title}</h4>
                                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Certificates</CardTitle>
            <CardDescription>Certificates you have earned.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">React for Beginners</p>
                        <p className="text-sm text-muted-foreground">Issued on: Aug 2024</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
