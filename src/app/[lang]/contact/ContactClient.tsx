"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Users,
  Briefcase,
  MessageSquare,
  Loader2,
  Star,
  Clock,
  Shield,
} from "lucide-react";

type FormValues = {
  email: string;
  phone: string;
  vaCount: string;
  va1Background?: string;
  va2Industry?: string;
  va2Background?: string;
  va3Industry?: string;
  va3Background?: string;
  va4Industry?: string;
  va4Background?: string;
  mainService: string;
  mainServiceOther?: string;
  otherTasks: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Let's Find Your Perfect VA",
    subtitle: "Tell us about your needs and we'll match you with the right virtual assistant within 48 hours.",
    email: "Email Address",
    phone: "Phone Number",
    mainServiceLabel: "Main Service Needed",
    mainServicePlaceholder: "Select a service",
    mainServiceOtherLabel: "Describe the service",
    mainServiceOtherPlaceholder: "Describe what you need...",
    vaCountLabel: "How many VAs do you need?",
    vaCountPlaceholder: "e.g. 2",
    va1Label: "VA #1 — Background & Tasks",
    va2IndustryLabel: "VA #2 — Industry",
    va2Label: "VA #2 — Background & Tasks",
    va3IndustryLabel: "VA #3 — Industry",
    va3Label: "VA #3 — Background & Tasks",
    va4IndustryLabel: "VA #4 — Industry",
    va4Label: "VA #4 — Background & Tasks",
    otherTasksLabel: "Additional Notes",
    otherTasksPlaceholder: "Anything else you'd like us to know...",
    submit: "Send Message",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    mainServiceRequired: "Please select a service",
    vaCountRequired: "Please enter the number of VAs",
    sideTitle: "Why Work With Us?",
    stat1Value: "200+",
    stat1Label: "Happy Clients",
    stat2Value: "48h",
    stat2Label: "Onboarding Time",
    stat3Value: "4.9/5",
    stat3Label: "Average Rating",
    feature1: "Pre-vetted, German-speaking VAs",
    feature2: "Save up to 70% vs local hires",
    feature3: "14-day money-back guarantee",
    feature4: "Dedicated account manager",
    responseTime: "We typically respond within 2 hours",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Finden Sie Ihren perfekten VA",
    subtitle: "Erzählen Sie uns von Ihren Bedürfnissen und wir finden den richtigen VA innerhalb von 48 Stunden.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    mainServiceLabel: "Hauptdienstleistung",
    mainServicePlaceholder: "Dienst auswählen",
    mainServiceOtherLabel: "Dienst beschreiben",
    mainServiceOtherPlaceholder: "Beschreiben Sie Ihre Anforderungen...",
    vaCountLabel: "Wie viele VAs benötigen Sie?",
    vaCountPlaceholder: "z.B. 2",
    va1Label: "VA #1 — Hintergrund & Aufgaben",
    va2IndustryLabel: "VA #2 — Branche",
    va2Label: "VA #2 — Hintergrund & Aufgaben",
    va3IndustryLabel: "VA #3 — Branche",
    va3Label: "VA #3 — Hintergrund & Aufgaben",
    va4IndustryLabel: "VA #4 — Branche",
    va4Label: "VA #4 — Hintergrund & Aufgaben",
    otherTasksLabel: "Weitere Anmerkungen",
    otherTasksPlaceholder: "Was sollen wir noch wissen...",
    submit: "Nachricht senden",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    mainServiceRequired: "Bitte wählen Sie einen Dienst",
    vaCountRequired: "Bitte geben Sie die Anzahl der VAs ein",
    sideTitle: "Warum mit uns arbeiten?",
    stat1Value: "200+",
    stat1Label: "Zufriedene Kunden",
    stat2Value: "48h",
    stat2Label: "Onboarding-Zeit",
    stat3Value: "4.9/5",
    stat3Label: "Durchschnittsbewertung",
    feature1: "Geprüfte, deutschsprachige VAs",
    feature2: "Bis zu 70% günstiger als lokale Einstellungen",
    feature3: "14-Tage-Geld-zurück-Garantie",
    feature4: "Persönlicher Account Manager",
    responseTime: "Wir antworten in der Regel innerhalb von 2 Stunden",
  },
};

const industryOptions = [
  { value: "ecommerce", label: "E-Commerce" },
  { value: "marketing", label: "Marketing / Agency" },
  { value: "saas", label: "SaaS / Tech" },
  { value: "other", label: "Other" },
];

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-medium text-destructive mt-1">{message}</p> : null;
}

export default function ContactClient({ lang }: { lang: string }) {
  const c = translations[lang] ?? translations.en;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "", phone: "", vaCount: "",
      va1Background: "", va2Industry: "", va2Background: "",
      va3Industry: "", va3Background: "", va4Industry: "", va4Background: "",
      mainService: "", mainServiceOther: "", otherTasks: "",
    },
    mode: "onBlur",
  });

  const vaCountValue = useWatch({ control, name: "vaCount" });
  const mainServiceValue = useWatch({ control, name: "mainService" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a");
    formData.append("to", "patryk@dononlineagency.com");
    formData.append("subject", "New contact request - Don Va");
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("vaCount", data.vaCount);
    if (data.va1Background?.trim()) formData.append("va1Background", data.va1Background.trim());
    if (data.va2Industry?.trim()) formData.append("va2Industry", data.va2Industry.trim());
    if (data.va2Background?.trim()) formData.append("va2Background", data.va2Background.trim());
    if (data.va3Industry?.trim()) formData.append("va3Industry", data.va3Industry.trim());
    if (data.va3Background?.trim()) formData.append("va3Background", data.va3Background.trim());
    if (data.va4Industry?.trim()) formData.append("va4Industry", data.va4Industry.trim());
    if (data.va4Background?.trim()) formData.append("va4Background", data.va4Background.trim());
    if (data.mainService) formData.append("mainService", data.mainService);
    if (data.mainService === "other" && data.mainServiceOther?.trim())
      formData.append("mainServiceOther", data.mainServiceOther.trim());
    if (data.otherTasks.trim()) formData.append("otherTasks", data.otherTasks.trim());

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your message has been sent." });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again." });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        {/* Page Header */}
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: c.stat1Value, label: c.stat1Label, icon: Users },
                { value: c.stat2Value, label: c.stat2Label, icon: Clock },
                { value: c.stat3Value, label: c.stat3Label, icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-gold/40 transition-colors">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-gold">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="p-6 bg-card border border-border/50 rounded-xl space-y-4">
              <h3 className="font-bold text-foreground text-base">{c.sideTitle}</h3>
              <ul className="space-y-3">
                {[c.feature1, c.feature2, c.feature3, c.feature4].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/20 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-card border border-border/50 rounded-xl space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "Don Va transformed our operations. We saved over €40k in the first year alone."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="text-gold font-bold text-xs">SJ</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">CEO, TechStart Inc</div>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Your information is 100% secure and never shared.</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
              {/* Form header bar */}
              <div className="px-6 sm:px-8 py-5 border-b border-border/50 bg-gradient-to-r from-gold/5 to-transparent">
                <h2 className="font-bold text-foreground text-lg">Fill in your details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">All fields marked are required</p>
              </div>

              <form className="px-6 sm:px-8 py-7 space-y-8" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection icon={Mail} title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{c.email} <span className="text-gold">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{c.phone} <span className="text-gold">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 555 123 4567"
                        className="border-border/60 focus:border-gold/60 transition-colors"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Service */}
                <FormSection icon={Briefcase} title="Service Requirements">
                  <div className="space-y-1.5">
                    <Label className="text-sm">{c.mainServiceLabel} <span className="text-gold">*</span></Label>
                    <Select onValueChange={(v) => setValue("mainService", v, { shouldValidate: true })}>
                      <SelectTrigger className="border-border/60 focus:border-gold/60">
                        <SelectValue placeholder={c.mainServicePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social-media">Social Media Management</SelectItem>
                        <SelectItem value="customer-support">Customer Support</SelectItem>
                        <SelectItem value="back-office">Back-Office & Admin</SelectItem>
                        <SelectItem value="seo-content">SEO & Content</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("mainService", { required: c.mainServiceRequired })} />
                    <FieldError message={errors.mainService?.message} />
                    <AnimatePresence>
                      {mainServiceValue === "other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 mt-3"
                        >
                          <Label htmlFor="mainServiceOther" className="text-sm">{c.mainServiceOtherLabel}</Label>
                          <Textarea
                            id="mainServiceOther"
                            rows={3}
                            placeholder={c.mainServiceOtherPlaceholder}
                            className="border-border/60 focus:border-gold/60 resize-none"
                            {...register("mainServiceOther")}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FormSection>

                {/* VA Count */}
                <FormSection icon={Users} title="Team Size">
                  <div className="space-y-1.5">
                    <Label htmlFor="vaCount" className="text-sm">{c.vaCountLabel} <span className="text-gold">*</span></Label>
                    <Input
                      id="vaCount"
                      type="number"
                      min={1}
                      max={10}
                      placeholder={c.vaCountPlaceholder}
                      className="border-border/60 focus:border-gold/60 max-w-[160px]"
                      {...register("vaCount", { required: c.vaCountRequired })}
                    />
                    <FieldError message={errors.vaCount?.message} />
                  </div>

                  {/* Dynamic VA fields */}
                  <AnimatePresence>
                    {[1, 2, 3, 4].map((n) =>
                      Number(vaCountValue) >= n ? (
                        <motion.div
                          key={n}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-muted/30 border border-border/40 rounded-xl space-y-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center">{n}</span>
                            <span className="text-sm font-semibold text-foreground">Virtual Assistant #{n}</span>
                          </div>
                          {n >= 2 && (
                            <div className="space-y-1.5">
                              <Label className="text-xs text-muted-foreground">{c[`va${n}IndustryLabel`]}</Label>
                              <Select onValueChange={(v) => setValue(`va${n}Industry` as any, v)}>
                                <SelectTrigger className="border-border/60 h-9 text-sm">
                                  <SelectValue placeholder={c[`va${n}IndustryLabel`]} />
                                </SelectTrigger>
                                <SelectContent>
                                  {industryOptions.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">{c[`va${n === 1 ? 1 : n}Label`]}</Label>
                            <Textarea
                              rows={2}
                              placeholder={
                                n === 1 ? "Example: Customer support for Shopify store, fluent German, email + chat." :
                                n === 2 ? "Example: Back-office admin: email inbox, calendar coordination, invoicing." :
                                n === 3 ? "Example: SEO & content: blog writing, keyword research, on-page optimization." :
                                "Example: Social media: content scheduling, engagement, reports."
                              }
                              className="border-border/60 focus:border-gold/60 resize-none text-sm"
                              {...register(`va${n === 1 ? "1" : n}Background` as any)}
                            />
                          </div>
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>
                </FormSection>

                {/* Additional Notes */}
                <FormSection icon={MessageSquare} title="Additional Notes">
                  <div className="space-y-1.5">
                    <Label htmlFor="otherTasks" className="text-sm">{c.otherTasksLabel}</Label>
                    <Textarea
                      id="otherTasks"
                      rows={4}
                      placeholder={c.otherTasksPlaceholder}
                      className="border-border/60 focus:border-gold/60 resize-none"
                      {...register("otherTasks")}
                    />
                  </div>
                </FormSection>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-3 bg-gold hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {c.submitSending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {c.submit}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
