'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { initGA } from '@/lib/analytics/gtag';

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      setIsOpen(true);
    } else if (consent === 'true') {
      initGA();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsOpen(false);
    initGA();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cookie Consent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            We use cookies to improve your experience and analyze website traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
          <p className="text-xs text-gray-500">
            Learn more in our{' '}
            <a href="/privacy" className="text-va-blue hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept} className="bg-primary-900 hover:bg-primary-900/90">
              Accept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}