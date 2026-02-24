import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import type { UserProfile } from "@/hooks/useUserProfile";

interface ProfileTabProps {
  profile: UserProfile | null;
  onSave: (updates: Partial<UserProfile>) => Promise<void>;
}

export function ProfileTab({ profile, onSave }: ProfileTabProps) {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [deck, setDeck] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [blog, setBlog] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setBio(profile.linkedin_bio || "");
      setEmail(profile.outreach_email || "");
      setDeck(profile.deck_link || "");
      setProfileLink(profile.profile_link || "");
      setBlog(profile.blog_link || "");
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      linkedin_bio: bio,
      outreach_email: email,
      deck_link: deck,
      profile_link: profileLink,
      blog_link: blog,
    });
    toast({ title: "Profile saved" });
    setSaving(false);
  };

  return (
    <Card className="max-w-2xl border-border">
      <CardHeader>
        <CardTitle>Outreach Profile</CardTitle>
        <CardDescription>These details are used in your auto-generated email templates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>LinkedIn Bio / Summary</Label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Your professional summary..." />
        </div>
        <div className="space-y-2">
          <Label>Outreach Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Deck Link</Label>
            <Input value={deck} onChange={(e) => setDeck(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label>Profile Link</Label>
            <Input value={profileLink} onChange={(e) => setProfileLink(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label>Blog Link</Label>
            <Input value={blog} onChange={(e) => setBlog(e.target.value)} placeholder="https://..." />
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
