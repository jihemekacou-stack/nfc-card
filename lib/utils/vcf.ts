/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateVCF(profile: any, contacts: any[]): string {
  const emailContact = contacts.find((c: any) => c.type === 'email');
  const phoneContact = contacts.find((c: any) => c.type === 'phone');

  let vcf = `BEGIN:VCARD\nVERSION:3.0\n`;
  
  if (profile?.displayName) {
    vcf += `FN:${profile.displayName}\n`;
    vcf += `N:${profile.displayName};;;;\n`;
  }
  
  if (profile?.company) {
    vcf += `ORG:${profile.company}\n`;
  }
  
  if (profile?.jobTitle) {
    vcf += `TITLE:${profile.jobTitle}\n`;
  }
  
  if (emailContact?.value) {
    vcf += `EMAIL;TYPE=INTERNET:${emailContact.value}\n`;
  }
  
  if (phoneContact?.value) {
    const code = phoneContact.countryCode || '';
    const num = phoneContact.value;
    vcf += `TEL;TYPE=CELL:${code}${num}\n`;
  }
  
  vcf += `END:VCARD`;
  
  return vcf;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function downloadVCF(profile: any, contacts: any[]) {
  const vcfString = generateVCF(profile, contacts);
  const blob = new Blob([vcfString], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${profile?.displayName?.replace(/\\s+/g, '_') || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
