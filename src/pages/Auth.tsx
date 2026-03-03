import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isForgot) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "Password reset link sent." });
      }
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isForgot ? "Reset Password" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isForgot
              ? "Enter your email to receive a reset link"
              : "Sign in to your compliance dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {!isForgot && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isForgot ? "Send Reset Link" : "Sign In"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            {!isForgot && (
              <button
                onClick={() => setIsForgot(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </button>
            )}
            {isForgot && (
              <button
                onClick={() => setIsForgot(false)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to sign in
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
