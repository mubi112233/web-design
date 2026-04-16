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
  companyName: string;
  contactName: string;
  positionType: string;
  positionTypeOther?: string;
  numberOfHires: string;
  industry: string;
  location: string;
  employmentType: string;
  timeline: string;
  salaryRange: string;
  requirements: string;
  otherInfo: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Let's Find Your Perfect Candidates",
    subtitle: "Tell us about your hiring needs and we'll connect you with top talent that matches your requirements. Get qualified candidates within 5-7 business days.",
    email: "Email Address",
    phone: "Phone Number",
    companyName: "Company Name",
    contactName: "Your Name",
    positionTypeLabel: "Position Type",
    positionTypePlaceholder: "Select position type",
    positionTypeOtherLabel: "Describe the position",
    positionTypeOtherPlaceholder: "What role are you hiring for?",
    numberOfHiresLabel: "Number of Hires Needed",
    numberOfHiresPlaceholder: "e.g. 3",
    industryLabel: "Industry/Sector",
    locationLabel: "Job Location",
    locationPlaceholder: "City, Country or Remote",
    employmentTypeLabel: "Employment Type",
    employmentTypePlaceholder: "Select employment type",
    timelineLabel: "Hiring Timeline",
    timelinePlaceholder: "Select timeline",
    salaryRangeLabel: "Salary Range (Annual/EUR)",
    salaryRangePlaceholder: "e.g. 45000 - 60000",
    requirementsLabel: "Candidate Requirements",
    requirementsPlaceholder: "Skills, experience, qualifications, languages needed...",
    otherInfoLabel: "Additional Information",
    otherInfoPlaceholder: "Anything else we should know about your hiring needs...",
    submit: "Submit Hiring Request",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    companyNameRequired: "Company name is required",
    contactNameRequired: "Your name is required",
    positionTypeRequired: "Please select position type",
    industryRequired: "Please select industry",
    sideTitle: "Why Choose DON Recruitment?",
    stat1Value: "200+",
    stat1Label: "Successful Placements",
    stat2Value: "5 Days",
    stat2Label: "Avg. Time to Hire",
    stat3Value: "4.9/5",
    stat3Label: "Client Satisfaction",
    feature1: "Pre-screened, qualified candidates only",
    feature2: "Personal recruiter assigned to your case",
    feature3: "Replacement guarantee within 90 days",
    feature4: "DACH region recruitment specialists",
    responseTime: "We respond within 2 hours during business hours",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Lassen Sie uns Ihre perfekten Kandidaten finden",
    subtitle: "Erzählen Sie uns von Ihren Einstellungsanforderungen und wir verbinden Sie mit erstklassigen Talenten. Erhalten Sie qualifizierte Kandidaten innerhalb von 5-7 Werktagen.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    companyName: "Firmenname",
    contactName: "Ihr Name",
    positionTypeLabel: "Positionstyp",
    positionTypePlaceholder: "Positionstyp wählen",
    positionTypeOtherLabel: "Position beschreiben",
    positionTypeOtherPlaceholder: "Für welche Rolle suchen Sie?",
    numberOfHiresLabel: "Anzahl der Einstellungen",
    numberOfHiresPlaceholder: "z.B. 3",
    industryLabel: "Branche/Sektor",
    locationLabel: "Arbeitsort",
    locationPlaceholder: "Stadt, Land oder Remote",
    employmentTypeLabel: "Anstellungsart",
    employmentTypePlaceholder: "Anstellungsart wählen",
    timelineLabel: "Einstellungszeitraum",
    timelinePlaceholder: "Zeitraum wählen",
    salaryRangeLabel: "Gehaltsspanne (Jährlich/EUR)",
    salaryRangePlaceholder: "z.B. 45000 - 60000",
    requirementsLabel: "Kandidatenanforderungen",
    requirementsPlaceholder: "Fähigkeiten, Erfahrung, Qualifikationen, Sprachen...",
    otherInfoLabel: "Zusätzliche Informationen",
    otherInfoPlaceholder: "Was sollten wir noch über Ihre Einstellungsanforderungen wissen...",
    submit: "Einstellungsanfrage senden",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    companyNameRequired: "Firmenname ist erforderlich",
    contactNameRequired: "Ihr Name ist erforderlich",
    positionTypeRequired: "Bitte wählen Sie den Positionstyp",
    industryRequired: "Bitte wählen Sie die Branche",
    sideTitle: "Warum DON Recruitment wählen?",
    stat1Value: "200+",
    stat1Label: "Erfolgreiche Vermittlungen",
    stat2Value: "5 Tage",
    stat2Label: "Ø Einstellungszeit",
    stat3Value: "4.9/5",
    stat3Label: "Kundenzufriedenheit",
    feature1: "Nur vorbereitete, qualifizierte Kandidaten",
    feature2: "Persönlicher Recruiter für Ihren Fall",
    feature3: "Ersatzgarantie innerhalb von 90 Tagen",
    feature4: "Spezialisten für DACH-Region",
    responseTime: "Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten",
  },
};

const positionTypeOptions = [
  { value: "executive", label: "Executive / C-Level" },
  { value: "management", label: "Management" },
  { value: "technical", label: "Technical / IT" },
  { value: "sales", label: "Sales / Business Development" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance / Accounting" },
  { value: "hr", label: "Human Resources" },
  { value: "operations", label: "Operations" },
  { value: "admin", label: "Administration" },
  { value: "other", label: "Other" },
];

const industryOptions = [
  { value: "technology", label: "Technology / IT" },
  { value: "finance", label: "Finance / Banking" },
  { value: "healthcare", label: "Healthcare / Pharma" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "retail", label: "Retail / E-Commerce" },
  { value: "logistics", label: "Logistics / Transport" },
  { value: "energy", label: "Energy / Utilities" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const employmentTypeOptions = [
  { value: "fulltime", label: "Full-Time" },
  { value: "parttime", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const timelineOptions = [
  { value: "immediate", label: "Immediate / ASAP" },
  { value: "2weeks", label: "Within 2 weeks" },
  { value: "1month", label: "Within 1 month" },
  { value: "2months", label: "Within 2 months" },
  { value: "3months", label: "Within 3 months" },
  { value: "flexible", label: "Flexible" },
];

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-blue-400" />
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
      email: "", phone: "", companyName: "", contactName: "",
      positionType: "", positionTypeOther: "", numberOfHires: "",
      industry: "", location: "", employmentType: "", timeline: "",
      salaryRange: "", requirements: "", otherInfo: "",
    },
    mode: "onBlur",
  });

  const positionTypeValue = useWatch({ control, name: "positionType" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a");
    formData.append("to", "patryk@dononlineagency.com");
    formData.append("subject", "New Hiring Request - DON Recruitment");
    formData.append("companyName", data.companyName);
    formData.append("contactName", data.contactName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("positionType", data.positionType);
    if (data.positionType === "other" && data.positionTypeOther?.trim())
      formData.append("positionTypeOther", data.positionTypeOther.trim());
    formData.append("numberOfHires", data.numberOfHires);
    formData.append("industry", data.industry);
    formData.append("location", data.location);
    formData.append("employmentType", data.employmentType);
    formData.append("timeline", data.timeline);
    formData.append("salaryRange", data.salaryRange);
    if (data.requirements.trim()) formData.append("requirements", data.requirements.trim());
    if (data.otherInfo.trim()) formData.append("otherInfo", data.otherInfo.trim());

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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/4 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        {/* Page Header */}
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
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
                <div key={label} className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-blue-400/40 transition-colors">
                  <Icon className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-blue-400">{value}</div>
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
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-card border border-border/50 rounded-xl space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;DON Recruitment found us the perfect CTO within 10 days. Their candidate quality exceeded our expectations.&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-xs">MK</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Michael Keller</div>
                  <div className="text-xs text-muted-foreground">CEO, TechFlow GmbH</div>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
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
              <div className="px-6 sm:px-8 py-5 border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-transparent">
                <h2 className="font-bold text-foreground text-lg">Fill in your details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">All fields marked are required</p>
              </div>

              <form className="px-6 sm:px-8 py-7 space-y-8" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection icon={Mail} title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactName" className="text-sm">{c.contactName} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="John Smith"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("contactName", { required: c.contactNameRequired })}
                      />
                      <FieldError message={errors.contactName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{c.email} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName" className="text-sm">{c.companyName} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Your Company GmbH"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("companyName", { required: c.companyNameRequired })}
                      />
                      <FieldError message={errors.companyName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{c.phone} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 123 456 789"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Hiring Needs */}
                <FormSection icon={Briefcase} title="Hiring Requirements">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.positionTypeLabel} <span className="text-blue-400">*</span></Label>
                      <Select onValueChange={(v) => setValue("positionType", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.positionTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {positionTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("positionType", { required: c.positionTypeRequired })} />
                      <FieldError message={errors.positionType?.message} />
                      <AnimatePresence>
                        {positionTypeValue === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 mt-3"
                          >
                            <Label htmlFor="positionTypeOther" className="text-sm">{c.positionTypeOtherLabel}</Label>
                            <Textarea
                              id="positionTypeOther"
                              rows={2}
                              placeholder={c.positionTypeOtherPlaceholder}
                              className="border-border/60 focus:border-blue-400/60 resize-none"
                              {...register("positionTypeOther")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="numberOfHires" className="text-sm">{c.numberOfHiresLabel}</Label>
                      <Input
                        id="numberOfHires"
                        type="number"
                        min={1}
                        max={100}
                        placeholder={c.numberOfHiresPlaceholder}
                        className="border-border/60 focus:border-blue-400/60"
                        {...register("numberOfHires")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.industryLabel} <span className="text-blue-400">*</span></Label>
                      <Select onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("industry", { required: c.industryRequired })} />
                      <FieldError message={errors.industry?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="location" className="text-sm">{c.locationLabel}</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder={c.locationPlaceholder}
                        className="border-border/60 focus:border-blue-400/60"
                        {...register("location")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.employmentTypeLabel}</Label>
                      <Select onValueChange={(v) => setValue("employmentType", v)}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.employmentTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("employmentType")} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.timelineLabel}</Label>
                      <Select onValueChange={(v) => setValue("timeline", v)}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.timelinePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("timeline")} />
                    </div>
                  </div>
                </FormSection>

                {/* Job Details */}
                <FormSection icon={Users} title="Job Details">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="salaryRange" className="text-sm">{c.salaryRangeLabel}</Label>
                      <Input
                        id="salaryRange"
                        type="text"
                        placeholder={c.salaryRangePlaceholder}
                        className="border-border/60 focus:border-blue-400/60"
                        {...register("salaryRange")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="requirements" className="text-sm">{c.requirementsLabel}</Label>
                      <Textarea
                        id="requirements"
                        rows={4}
                        placeholder={c.requirementsPlaceholder}
                        className="border-border/60 focus:border-blue-400/60 resize-none"
                        {...register("requirements")}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Additional Notes */}
                <FormSection icon={MessageSquare} title="Additional Information">
                  <div className="space-y-1.5">
                    <Label htmlFor="otherInfo" className="text-sm">{c.otherInfoLabel}</Label>
                    <Textarea
                      id="otherInfo"
                      rows={4}
                      placeholder={c.otherInfoPlaceholder}
                      className="border-border/60 focus:border-blue-400/60 resize-none"
                      {...register("otherInfo")}
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
