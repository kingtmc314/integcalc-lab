import React from 'react';
import { useLanguage } from '../i18n';

export default function ReferenceLink({ number = '1.2', className = '' }) {
  const { t } = useLanguage();
  return <a
    className={`reference-link ${className}`}
    href={`#/formulas?ref=${encodeURIComponent(number)}`}
    title={`${t('viewTheorem')} ${number}`}
  >
    <span>{t('theorem')}</span><strong>{number}</strong>
  </a>;
}
