import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqItems: { question: string, answer: string }[] = [
    {
      question: 'What is OLX?',
      answer: 'OLX is a global online marketplace where users can buy and sell goods and services locally. It provides a platform for individuals and businesses to connect and trade in various categories such as electronics, vehicles, furniture, and more.'
    },
    {
      question: 'How do I buy on OLX?',
      answer: 'To buy on OLX, browse listings in your desired category and location. Contact sellers directly through the platform to negotiate and arrange for purchase. Always ensure to meet in a safe location and inspect items before finalizing the transaction.'
    },
    {
      question: 'How do I sell on OLX?',
      answer: 'Selling on OLX is easy. Create an account, take clear photos of your item, and write a detailed description. Post your ad in the relevant category and respond promptly to inquiries from potential buyers. Once a deal is agreed upon, arrange for safe payment and delivery.'
    },
    {
      question: 'Is OLX free to use?',
      answer: 'Yes, OLX is free for users to browse listings, post ads, and contact sellers or buyers. There are no charges for basic use of the platform. However, premium features or promotions may involve fees.'
    },
    {
      question: 'How can I ensure a safe transaction on OLX?',
      answer: 'To ensure a safe transaction, always meet in a public place and inspect the item before making any payment. Use OLX\'s messaging system to communicate with buyers or sellers and avoid sharing personal contact information until necessary.'
    },
    {
      question: 'Can I trust the sellers on OLX?',
      answer: 'OLX encourages users to review seller ratings and read feedback from previous transactions to gauge trustworthiness. Use common sense and caution when dealing with unfamiliar sellers, and report any suspicious activity to OLX customer support.'
    },
    {
      question: 'How can I contact OLX customer support?',
      answer: 'For any inquiries or assistance, you can contact OLX customer support through their website or app. They provide help with account issues, technical support, and any other questions you may have about using the platform.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question: Element) => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling as HTMLElement;
        answer.classList.toggle('show');
      });
    });
  }

}
