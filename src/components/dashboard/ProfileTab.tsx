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

const MAX_BIO_LENGTH = 500;
const MAX_LINK_LENGTH = 500;

function isValidUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value: string): string {
  // Remove control characters except newlines and tabs
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

export function ProfileTab({ profile, onSave }: ProfileTabProps) {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [deck, setDeck] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [blog, setBlog] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (bio.length > MAX_BIO_LENGTH) newErrors.bio = `Max ${MAX_BIO_LENGTH} characters`;
    if (email && !isValidEmail(email)) newErrors.email = "Invalid email format";
    if (email.length > 255) newErrors.email = "Max 255 characters";
    if (deck && !isValidUrl(deck)) newErrors.deck = "Must be a valid http(s) URL";
    if (deck.length > MAX_LINK_LENGTH) newErrors.deck = `Max ${MAX_LINK_LENGTH} characters`;
    if (profileLink && !isValidUrl(profileLink)) newErrors.profileLink = "Must be a valid http(s) URL";
    if (profileLink.length > MAX_LINK_LENGTH) newErrors.profileLink = `Max ${MAX_LINK_LENGTH} characters`;
    if (blog && !isValidUrl(blog)) newErrors.blog = "Must be a valid http(s) URL";
    if (blog.length > MAX_LINK_LENGTH) newErrors.blog = `Max ${MAX_LINK_LENGTH} characters`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast({ title: "Please fix validation errors", variant: "destructive" });
      return;
    }
    setSaving(true);
    await onSave({
      linkedin_bio: sanitizeText(bio.trim()),
      outreach_email: email.trim(),
      deck_link: deck.trim(),
      profile_link: profileLink.trim(),
      blog_link: blog.trim(),
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
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Your professional summary..."
            maxLength={MAX_BIO_LENGTH}
          />
          <p className="text-xs text-muted-foreground">{bio.length}/{MAX_BIO_LENGTH}</p>
          {errors.bio && <p className="text-xs text-destructive">{errors.bio}</p>}
        </div>
        <div className="space-y-2">
          <Label>Outreach Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" maxLength={255} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Deck Link</Label>
            <Input value={deck} onChange={(e) => setDeck(e.target.value)} placeholder="https://..." maxLength={MAX_LINK_LENGTH} />
            {errors.deck && <p className="text-xs text-destructive">{errors.deck}</p>}
          </div>
          <div className="space-y-2">
            <Label>Profile Link</Label>
            <Input value={profileLink} onChange={(e) => setProfileLink(e.target.value)} placeholder="https://..." maxLength={MAX_LINK_LENGTH} />
            {errors.profileLink && <p className="text-xs text-destructive">{errors.profileLink}</p>}
          </div>
          <div className="space-y-2">
            <Label>Blog Link</Label>
            <Input value={blog} onChange={(e) => setBlog(e.target.value)} placeholder="https://..." maxLength={MAX_LINK_LENGTH} />
            {errors.blog && <p className="text-xs text-destructive">{errors.blog}</p>}
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
