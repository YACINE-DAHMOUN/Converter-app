import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { conversion } from '../../type/converter';
import { Rates } from '../../type/converter';

// Ajout des interfaces pour typer correctement les taux




@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  amount: number = 0;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  result: number = 0;
  conversionHistory: conversion[] = [];

  // Maintenant rates est correctement typé
  rates: { [key: string]: { [key: string]: number } } = {
    'EUR': {'USD': 1.09, 'GBP': 0.87, 'JPY': 163.25, 'CAD': 1.47},
    'USD': {'EUR': 0.92, 'GBP': 0.80, 'JPY': 149, 'CAD': 1.35},
    'GBP': {'EUR': 1.15, 'USD': 1.25, 'JPY': 186.50, 'CAD': 1.69},
    'JPY': {'EUR': 0.0061, 'USD': 0.0067, 'GBP': 0.0054, 'CAD': 0.009},
    'CAD': {'EUR': 0.68, 'USD': 0.74, 'GBP': 0.59, 'JPY': 111.05}
  };

  convertCurrency() {
    if (this.amount <= 0) return;

    if (this.fromCurrency === this.toCurrency) {
      this.result = this.amount;
    } else {
      // Vérification de sécurité
      const rate = this.rates[this.fromCurrency]?.[this.toCurrency];
      if (rate) {
        this.result = this.amount * rate;
      } else {
        console.error('Taux de conversion non trouvé');
        return;
      }
    }

    this.addToHistory();
  }

  switchCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    if (this.amount > 0) {
      this.convertCurrency();
    }
  }

  addToHistory() {
    const conversion: conversion = {
      fromAmount: this.amount,
      fromCurrency: this.fromCurrency,
      toAmount: this.result,
      toCurrency: this.toCurrency,
      date: new Date()
    };

    this.conversionHistory.unshift(conversion);
    if (this.conversionHistory.length > 10) {
      this.conversionHistory.pop();
    }
  }
}
