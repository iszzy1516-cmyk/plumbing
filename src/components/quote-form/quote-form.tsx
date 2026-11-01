"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site/site";
import { scrollToElement } from "@/lib/lenis-store/lenis-store";

// The one enquiry component. Frontend only, so nothing is sent anywhere.
// TODO: connect submit() to a form service such as Formspree, then replace the "isn't connected" panel with a thank-you.

const NOT_SURE = "Something else, or I'm not sure";

const kinds = [
  { value: "quote", label: "Get a quote" },
  { value: "visit", label: "Book a visit" },
] as const;

const timings = [
  { value: "urgent", label: site.emergency ? "It's an emergency" : "As soon as possible" },
  { value: "soon", label: "In the next week or two" },
  { value: "flexible", label: "I'm flexible" },
];

const slots = ["Morning", "Afternoon", "Any time"];

type Values = {
  kind: "quote" | "visit";
  service: string;
  timing: string;
  date: string;
  slot: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
};

type Field = "service" | "date" | "details" | "name" | "phone" | "email" | "postcode";
type Errors = Partial<Record<Field, string>>;

const fieldClass =
  "h-14 w-full cursor-pointer rounded-2xl border border-input bg-white px-4 text-[1.0625rem] transition-[border-color,box-shadow] duration-150 hover:border-ink focus-visible:border-blue aria-invalid:border-error aria-invalid:border-2";
const labelClass = "mb-2 block text-[0.9375rem] font-medium";

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.service) errors.service = "Pick the closest match. It doesn't have to be exact.";
  if (values.kind === "visit") {
    if (!values.date) errors.date = "Pick a day that suits you.";
    else if (values.date < todayString()) errors.date = "That date has passed. Pick a day from today onwards.";
  }
  if (values.details.trim().length < 5) errors.details = "Tell us a little about the problem.";
  if (values.name.trim().length < 2) errors.name = "Tell us your name, so we know who to ask for.";
  if (!/^(\+44\s?|0)[\d\s]{9,12}$/.test(values.phone.trim())) errors.phone = "Enter a UK phone number, like 020 7946 0123.";
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Check your email address, or leave it blank.";
  if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(values.postcode.trim())) errors.postcode = "Enter a full UK postcode, like SW1A 1AA.";

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-small mt-1.5 text-error">
      {message}
    </p>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(
    new Date(year, month - 1, day),
  );
}

function Chips({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`relative inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full px-5 py-2 text-[0.9375rem] font-medium transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue ${
              value === option.value ? "bg-blue text-white" : "bg-white hover:bg-blue-soft"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="absolute size-px opacity-0"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function QuoteForm() {
  const params = useSearchParams();
  const linked = site.services.find((service) => service.id === params.get("service"));
  const [values, setValues] = useState<Values>({
    kind: "quote",
    service: linked?.title ?? "",
    timing: "soon",
    date: "",
    slot: "Any time",
    details: "",
    name: "",
    phone: "",
    email: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayString();
    // The panel is shorter than the form, so bring it into view.
    if (done && topRef.current) scrollToElement(topRef.current);
  }, [done, values.kind]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function checkField(field: Field) {
    setErrors((current) => ({ ...current, [field]: validate(values)[field] }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (["service", "date", "details", "name", "phone", "email", "postcode"] as Field[]).find((key) => found[key]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Frontend only: nothing is sent anywhere.
    setDone(true);
  }

  function field(name: Field) {
    return {
      id: name,
      name,
      value: values[name],
      onBlur: () => checkField(name),
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={topRef} className="scroll-mt-24">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              role="status"
              className="card bg-blue-soft p-[clamp(1.5rem,4vw,3.5rem)]"
            >
              <h2 className="text-h2">This form isn&apos;t connected yet</h2>
              <p className="text-lead mt-4">
                Nothing has been sent, {values.name.trim().split(" ")[0]}. Please call us so your job doesn&apos;t get missed.
              </p>
              <dl className="mt-6 grid gap-1 rounded-2xl bg-white/70 p-5">
                <dt className="text-small font-medium">Your request</dt>
                <dd>
                  {values.kind === "visit" ? `A visit on ${formatDate(values.date)} (${values.slot.toLowerCase()})` : "A quote"}: {values.service}, {values.postcode.trim().toUpperCase()}
                </dd>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={site.phone.href}>
                    <Phone aria-hidden="true" />
                    {site.phone.display}
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={() => setDone(false)}>
                  Back to the form
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              noValidate
              onSubmit={submit}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="card grid gap-6 bg-surface-2 p-[clamp(1.25rem,4vw,3rem)]"
            >
              <fieldset>
                <legend className={labelClass}>What would you like?</legend>
                <div className="inline-flex w-full rounded-full bg-white p-1 sm:w-auto">
                  {kinds.map((kind) => (
                    <label
                      key={kind.value}
                      className={`relative flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-[color,background-color] duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue ${
                        values.kind === kind.value ? "bg-blue text-white delay-200" : ""
                      }`}
                    >
                      {values.kind === kind.value && (
                        <motion.span
                          layoutId="quote-kind"
                          className="absolute inset-0 rounded-full bg-blue"
                          transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                        />
                      )}
                      <input
                        type="radio"
                        name="kind"
                        value={kind.value}
                        checked={values.kind === kind.value}
                        onChange={() => set("kind", kind.value)}
                        className="absolute size-px opacity-0"
                      />
                      <span className="relative">{kind.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <Label htmlFor="service" className={labelClass}>
                  What&apos;s the job?
                </Label>
                <select {...field("service")} onChange={(event) => set("service", event.target.value)} className={fieldClass}>
                  <option value="">Choose the closest match</option>
                  {site.services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value={NOT_SURE}>{NOT_SURE}</option>
                </select>
                <FieldError id="service-error" message={errors.service} />
              </div>

              {values.kind === "quote" ? (
                <div>
                  <Chips legend="When do you need it done?" name="timing" options={timings} value={values.timing} onChange={(value) => set("timing", value)} />
                  {values.timing === "urgent" && (
                    <p className="mt-3 rounded-2xl bg-blue-soft p-4">
                      If water is leaking, turn off your stopcock and{" "}
                      <a href={site.phone.href} className="font-medium underline underline-offset-4">
                        call {site.phone.display}
                      </a>
                      . It&apos;s much quicker than this form.
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="date" className={labelClass}>
                      Preferred day
                    </Label>
                    <Input ref={dateRef} type="date" {...field("date")} onChange={(event) => set("date", event.target.value)} />
                    <FieldError id="date-error" message={errors.date} />
                    <p className="text-small mt-2 text-ink-soft">We&apos;ll confirm the day with you, or suggest the nearest one we can do.</p>
                  </div>
                  <Chips legend="Preferred time" name="slot" options={slots.map((slot) => ({ value: slot, label: slot }))} value={values.slot} onChange={(value) => set("slot", value)} />
                </div>
              )}

              <div>
                <Label htmlFor="details" className={labelClass}>
                  What&apos;s going on?
                </Label>
                <Textarea
                  {...field("details")}
                  placeholder="For example: the kitchen tap has been dripping for a week and the cupboard underneath is damp."
                  onChange={(event) => set("details", event.target.value)}
                />
                <FieldError id="details-error" message={errors.details} />
              </div>

              <div>
                <Label htmlFor="name" className={labelClass}>
                  Your name
                </Label>
                <Input autoComplete="name" {...field("name")} onChange={(event) => set("name", event.target.value)} />
                <FieldError id="name-error" message={errors.name} />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className={labelClass}>
                    Phone
                  </Label>
                  <Input type="tel" autoComplete="tel" {...field("phone")} onChange={(event) => set("phone", event.target.value)} />
                  <FieldError id="phone-error" message={errors.phone} />
                </div>
                <div>
                  <Label htmlFor="postcode" className={labelClass}>
                    Postcode
                  </Label>
                  <Input autoComplete="postal-code" {...field("postcode")} onChange={(event) => set("postcode", event.target.value)} />
                  <FieldError id="postcode-error" message={errors.postcode} />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className={labelClass}>
                  Email (optional)
                </Label>
                <Input type="email" autoComplete="email" {...field("email")} onChange={(event) => set("email", event.target.value)} />
                <FieldError id="email-error" message={errors.email} />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-fit">
                {values.kind === "visit" ? "Request this visit" : "Ask for a quote"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
