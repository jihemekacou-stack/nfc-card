"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      router.push("/settings");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 sm:p-12 flex flex-col items-center">
          
          <Link href="/" className="flex items-center mb-12">
            <Image src="/logo.png" alt="Flexcard" width={140} height={50} className="object-contain" priority />
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Connectez-vous pour accéder à votre tableau de bord et modifier vos informations.
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1 uppercase tracking-wider">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm focus:bg-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5 ml-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Mot de passe</label>
                <Link href="#" className="text-xs text-violet-600 font-medium hover:underline">Oublié ?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm focus:bg-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70 mt-4"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          
        </div>
        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Pas encore de carte ? <Link href="/nos-cartes" className="font-bold text-violet-600 hover:underline">Découvrez nos offres</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
