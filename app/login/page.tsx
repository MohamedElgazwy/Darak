"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Home, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Mock API Request
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Since we don't have a backend yet, we simulate a delay and success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mocking success behavior
      router.push("/home");
    } catch (error) {
      setApiError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Right Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-right">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-primary p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-deep-blue tracking-tight">دارك</h1>
            </div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              مرحباً بك مجدداً في دارك. يرجى إدخال بياناتك للمتابعة.
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${errors.email ? "text-red-400" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full rounded-xl border-0 py-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.email ? "ring-red-300" : "ring-gray-300"
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      كلمة المرور
                    </label>
                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="font-semibold text-primary hover:text-primary-hover transition-colors"
                      >
                        هل نسيت كلمة المرور؟
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${errors.password ? "text-red-400" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full rounded-xl border-0 py-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.password ? "ring-red-300" : "ring-gray-300"
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600 font-medium">{errors.password}</p>
                  )}
                </div>

                {apiError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                    {apiError}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-modern-blue px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-soft hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري التحميل...
                      </>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-400">ليس لديك حساب؟</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/signup"
                  className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary-light px-3 py-2.5 text-sm font-bold text-primary hover:bg-blue-100 transition-all"
                >
                  إنشاء حساب جديد
                  <ArrowRight className="w-4 h-4 mr-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side: Image Content */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/login-bg.png"
          alt="Modern Real Estate"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-deep-blue/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-20 right-20 text-white max-w-lg">
          <h3 className="text-4xl font-bold mb-4">ابحث عن منزل أحلامك مع دارك</h3>
          <p className="text-lg text-blue-50 opacity-90 leading-relaxed">
            نحن نوفر لك أفضل العقارات في أرقى المناطق. سجل دخولك الآن لتصل إلى آلاف الخيارات المتميزة.
          </p>
          <div className="mt-8 flex gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-2xl font-bold">+1500</p>
              <p className="text-xs text-blue-100">عقار متاح</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-2xl font-bold">+500</p>
              <p className="text-xs text-blue-100">عميل سعيد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
