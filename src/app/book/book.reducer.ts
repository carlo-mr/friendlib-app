import {BookActions, BookActionTypes} from './book.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Book} from '../common/book.model';

export const bookAdapter = createEntityAdapter<Book>({
  selectId: (book: Book) => book.externalIdentifiers.gbooksId
});

export interface BookState extends EntityState<Book> {
}

const defaultState = {
  ids: [
    '-OQVCgAAQBAJ',
    'SrccswEACAAJ',
    'S6h3DwAAQBAJ',
    'OCtQAgAAQBAJ',
    'mgdxswEACAAJ',
    'gnteDwAAQBAJ',
    'F8RiDwAAQBAJ',
    'DVxODwAAQBAJ',
    'Qfd5DwAAQBAJ'
  ],
  entities: {
    '-OQVCgAAQBAJ': {
      title: 'Microservices',
      description: 'Feingranulare Systeme mit Microservices aufbauen Design, Entwicklung, Deployment, Testen und Monitoring ' +
        'Sicherheitsaspekte, Authentifizierung und Autorisierung Verteilte Systeme haben sich in den letzten Jahren stark verändert: ' +
        'Große monolithische Architekturen werden zunehmend in viele kleine, eigenständige Microservices aufgespalten. ' +
        'Aber die Entwicklung solcher Systeme bringt Herausforderungen ganz eigener Art mit sich. ' +
        'Dieses Buch richtet sich an Softwareentwickler, die sich über die zielführenden Aspekte von Microservice-Systemen wie Design, ' +
        'Entwicklung, Testen, Deployment und Monitoring informieren möchten. Sam Newman veranschaulicht und konkretisiert seine ' +
        'ganzheitliche Betrachtung der grundlegenden Konzepte von Microservice-Architekturen anhand zahlreicher praktischer ' +
        'Beispiele und Ratschläge. Er geht auf die Themen ein, mit denen sich Systemarchitekten und Administratoren bei der Einrichtung, ' +
        'Verwaltung und Entwicklung dieser Architekturen in jedem Fall auseinandersetzen müssen. Aus dem Inhalt: Vorteile von ' +
        'Microservices Gestaltung von Services Ausrichtung der Systemarchitektur an der Organisationsstruktur Möglichkeiten zur ' +
        'Integration von Services Schrittweise Aufspaltung einer monolithischen Codebasis Deployment einzelner Microservices mittels ' +
        'Continuous Integration Testen und Monitoring verteilter Systeme Sicherheitsaspekte Authentifizierung und Autorisierung zwischen ' +
        'Benutzer und Service bzw. zwischen Services untereinander Skalierung von Microservice-Architekturen »Microservice-Architekturen ' +
        'besitzen viele interessante Eigenschaften, allerdings sind bei der Umstellung so einige Fallstricke zu beachten. ' +
        'Dieses Buch wird Ihnen helfen herauszufinden, ob Microservices für Ihre Zwecke geeignet sind und zeigt Ihnen, ' +
        'wie Sie die Fallstricke umgehen können.« Martin Fowler, Chief Scientist, ThoughtWorks',
      language: 'de',
      externalIdentifiers: {
        gbooksId: '-OQVCgAAQBAJ',
        isbn13: '9783958450837',
        isbn10: '3958450830'
      },
      binding: 'BOOK',
      pages: 312,
      authors: [
        'Sam Newman'
      ],
      coverUrl: 'http://books.google.com/books/content?id=-OQVCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=-OQVCgAAQBAJ',
          method: 'PUT'
        }
      }
    },
    SrccswEACAAJ: {
      title: 'Microservices',
      language: 'en',
      externalIdentifiers: {
        gbooksId: 'SrccswEACAAJ',
        isbn10: '3864903130',
        isbn13: '9783864903137'
      },
      binding: 'BOOK',
      pages: 376,
      authors: [
        'Eberhard Wolff'
      ],
      coverUrl: 'http://books.google.com/books/content?id=SrccswEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=SrccswEACAAJ',
          method: 'PUT'
        }
      }
    },
    S6h3DwAAQBAJ: {
      title: 'Microservices',
      description: 'Eine Microservices-Architektur unterteilt Software-Systeme in eine Vielzahl kleiner Dienste, ' +
        'die unabhängig voneinander in Produktion gebracht werden können. Jedes Team arbeitet dabei an seinen Microservices ' +
        'und ist weitgehend entkoppelt von anderen Teams, das erlaubt eine einfache Skalierung agiler Prozesse.' +
        ' Die Aufteilung in Microservices schützt gegen den Verfall der Architektur, sodass die Systeme auch langfristig' +
        ' wartbar bleiben. Zudem können Legacy-Systeme durch Microservices ergänzt werden, ohne dabei den alten Code zu ändern. ' +
        'Und auch Continuous Delivery ist einfacher umsetzbar.Eberhard Wolff bietet Ihnen in diesem Buch eine umfangreiche' +
        ' Einführung in das Thema Microservices. Dabei geht es u.a. um:Vor- und Nachteile des Microservice-AnsatzesMicroservices ' +
        'vs. SOADie übergreifende Architektur von Microservice-SystemenDie Architektur einzelner ServicesAuswirkungen auf ' +
        'Projektorganisation, Betrieb, Testen und DeploymentNanoservicesDas Buch erläutert technologieneutrale Konzepte und ' +
        'Architekturen, die mit verschiedenen Technologien umgesetzt werden können. Als Beispiel für einen konkreten ' +
        'Technologie-Stack wird Java mit Spring Boot, dem Netflix-Stack und Spring Cloud gezeigt.Anhand von vielen ' +
        'Beispielen und konkreten Szenarien lernen Sie, wie Microservices möglichst gewinnbringend genutzt werden können. ' +
        'Außerdem erhalten Sie Anregungen, das Gelernte durch eigene Experimente weiter zu vertiefen.In der zweiten ' +
        'Auflage wurde der Abschnitt zu Domain-Driven Design komplett überarbeitet. Erweitert wurde die beispielhafte ' +
        'Beschreibung von Microservices-Technologien: Neben dem Netflix-Stack werden nun auch Alternativen erwähnt. ' +
        'Außerdem wurden die Essays zur Evolution von Microservices und zu Microservices in der Amazon Cloud aktualisiert.',
      language: 'de',
      externalIdentifiers: {
        gbooksId: 'S6h3DwAAQBAJ',
        isbn13: '9783960884149',
        isbn10: '3960884141'
      },
      binding: 'BOOK',
      pages: 384,
      authors: [
        'Eberhard Wolff'
      ],
      coverUrl: 'http://books.google.com/books/content?id=S6h3DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=S6h3DwAAQBAJ',
          method: 'PUT'
        }
      }
    },
    OCtQAgAAQBAJ: {
      title: 'Spring im Einsatz',
      description: 'SPRING IM EINSATZ // - Spring 3.0 auf den Punkt gebracht: ' +
        'Die zentralen Konzepte anschaulich und unterhaltsam erklärt. ' +
        '- Praxis-Know-how für den Projekteinsatz: Lernen Sie Spring mit Hilfe der zahlreichen Codebeispiele aktiv kennen. ' +
        '- Im Internet: Der vollständige Quellcode für die Applikationen dieses Buches Das Spring-Framework gehört zum ' +
        'obligatorischen Grundwissen eines Java-Entwicklers. Spring 3 führt leistungsfähige neue ' +
        'Features wie die Spring Expression Language (SpEL), neue Annotationen für IoC-Container und den ' +
        'lang ersehnten Support für REST ein. Es gibt keinen besseren Weg, um sich Spring anzueignen, als ' +
        'dieses Buch - egal ob Sie Spring gerade erst entdecken oder sich mit den neuen 3.0-Features vertraut' +
        ' machen wollen. Craig Walls setzt in dieser gründlich überarbeiteten 2. Auflage den anschaulichen ' +
        'und praxisorientierten Stil der Vorauflage fort. Er bringt als Autor sein Geschick für treffende ' +
        'und unterhaltsame Beispiele ein, die das Augenmerk direkt auf die Features und Techniken richten, ' +
        'die Sie wirklich brauchen. Diese Auflage hebt die wichtigsten Aspekte von Spring 3.0 hervor: ' +
        'REST, Remote-Services, Messaging, Security, MVC, Web Flow und vieles mehr. Das finden Sie in diesem Buch: ' +
        '- Die Arbeit mit Annotationen, um die Konfiguration zu reduzieren - Die Arbeit mit REST-konformen Ressourcen ' +
        '- Spring Expression Language (SpEL) - Security, Web Flow usw. AUS DEM INHALT: Spring ins kalte Wasser, Verschalten von Beans, ' +
        'Die XML-Konfiguration in Spring minimalisieren, Aspektorientierung, Zugriff auf die Datenbank, ' +
        'Transaktionen verwalten, Webapplikationen mit Spring MVC erstellen, Die Arbeit mit Spring Web Flow, ' +
        'Spring absichern, Die Arbeit mit Remote-Diensten, Spring und REST, Messaging in Spring, Verwalten von Spring-Beans mit JMX',
      language: 'de',
      externalIdentifiers: {
        gbooksId: 'OCtQAgAAQBAJ',
        isbn13: '9783446429468',
        isbn10: '3446429468'
      },
      binding: 'BOOK',
      pages: 428,
      authors: [
        'Craig Walls'
      ],
      coverUrl: 'http://books.google.com/books/content?id=OCtQAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=OCtQAgAAQBAJ',
          method: 'PUT'
        }
      }
    },
    mgdxswEACAAJ: {
      title: 'Microservices als Architekturmuster',
      description: 'Vor allem mit besserer Skalierbarkeit und Stabilität punkten Microservices gegenüber klassischen,' +
        ' monolythischen Anwendungen. Dieses Video-Training richtet sich an alle, die sich mit dem Thema ' +
        'Microservices aus Sicht der Architektur beschäftigen möchten, zeigt deren Bedeutung im Kontext ' +
        'moderner IT-Prozesse und definiert die Kriterien für einen erfolgreichen Service. Kernthemen wie ' +
        'Komposition, Integration, Testen, Bereitstellung und Überwachung stehen im Fokus und Sie erhalten ' +
        'wertvolle Vorschläge für die Auswahl der passenden Tools auf dem Weg zur Entwicklung Ihrer eigenen Microservice-Architektur.',
      language: 'de',
      externalIdentifiers: {
        gbooksId: 'mgdxswEACAAJ'
      },
      binding: 'BOOK',
      authors: [
        'Christopher Janietz'
      ],
      coverUrl: '',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=mgdxswEACAAJ',
          method: 'PUT'
        }
      }
    },
    gnteDwAAQBAJ: {
      title: 'TypeScript Microservices',
      description: 'Build robust microservice-based applications that are distributed, fault tolerant, ' +
        'and always available Key Features Learn to build message-driven services for effective communication' +
        ' Design microservices API using Reactive programming design patterns Deploy, scale and monitor microservices' +
        ' for consistent high performance Book Description In the last few years or so, microservices have achieved ' +
        'the rock star status and right now are one of the most tangible solutions in enterprises to make quick, ' +
        'effective, and scalable applications. The apparent rise of Typescript and long evolution from ES5 to ES6 ' +
        'has seen lots of big companies move to ES6 stack. If you want to learn how to leverage the power of' +
        ' microservices to build robust architecture using reactive programming and Typescript in Node.js, then ' +
        'this book is for you. Typescript Microservices is an end-to-end guide that shows you the implementation ' +
        'of microservices from scratch; right from starting the project to hardening and securing your services. ' +
        'We will begin with a brief introduction to microservices before learning to break your monolith applications ' +
        'into microservices. From here, you will learn reactive programming patterns and how to build APIs for' +
        ' microservices. The next set of topics will take you through the microservice architecture with TypeScript ' +
        'and communication between services. Further, you will learn to test and deploy your TypeScript microservices ' +
        'using the latest tools and implement continuous integration. Finally, you will learn to secure and harden your ' +
        'microservice. By the end of the book, you will be able to build production-ready, scalable, and ' +
        'maintainable microservices using Node.js and Typescript. What you will learn Get acquainted with ' +
        'the fundamentals behind microservices. Explore the behavioral changes needed for moving from monolithic ' +
        'to microservices. Dive into reactive programming, Typescript and Node.js to learn its fundamentals in ' +
        'microservices Understand and design a service gateway and service registry for your microservices. ' +
        'Maintain the state of microservice and handle dependencies. Perfect your microservice with unit testing ' +
        'and Integration testing Develop a microservice, secure it, deploy it, and then scale it Who this book is' +
        ' for This book is for JavaScript developers seeking to utilize their Node.js and Typescript skills to ' +
        'build microservices and move away from the monolithic architecture. Prior knowledge of TypeScript and Node.js is assumed.',
      language: 'en',
      externalIdentifiers: {
        gbooksId: 'gnteDwAAQBAJ',
        isbn13: '9781788836852',
        isbn10: '1788836855'
      },
      binding: 'BOOK',
      pages: 404,
      authors: [
        'Parth Ghiya'
      ],
      coverUrl: 'http://books.google.com/books/content?id=gnteDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=gnteDwAAQBAJ',
          method: 'PUT'
        }
      }
    },
    F8RiDwAAQBAJ: {
      title: 'Hands-On Microservices with C#',
      description: 'Build enterprise-grade microservice ecosystems with intensive case studies using C# Key ' +
        'Features Learn to build message-based microservices Packed with case studies to explain the intricacies' +
        ' of large-scale microservices Build scalable, modular, and robust architectures with C# Book Description ' +
        'C# is a powerful language when it comes to building applications and software architecture using rich ' +
        'libraries and tools such as .NET. This book will harness the strength of C# in developing microservices ' +
        'architectures and applications. This book shows developers how to develop an enterprise-grade, event-driven, ' +
        'asynchronous, message-based microservice framework using C#, .NET, and various open source tools. ' +
        'We will discuss how to send and receive messages, how to design many types of microservice that are ' +
        'truly usable in a corporate environment. We will also dissect each case and explain the code, best practices,' +
        ' pros and cons, and more. Through our journey, we will use many open source tools, and create file monitors, ' +
        'a machine learning microservice, a quantitative financial microservice that can handle bonds and credit default' +
        ' swaps, a deployment microservice to show you how to better manage your deployments, and memory, health status, ' +
        'and other microservices. By the end of this book, you will have a complete microservice ecosystem you can place ' +
        'into production or customize in no time. What you will learn Explore different open source tools within the cont' +
        'ext of designing microservices Learn to provide insulation to exception-prone function calls Build common messages ' +
        'used between microservices for communication Learn to create a microservice using our base class and interface' +
        ' Design a quantitative financial machine microservice Learn to design a microservice that is capable of using' +
        ' Blockchain technology Who this book is for C# developers, software architects, and professionals who want to ' +
        'master the art of designing the microservice architecture that is scalable based on environment. Developers ' +
        'should have a basic understanding of.NET application development using C# and Visual Studio',
      language: 'en',
      externalIdentifiers: {
        gbooksId: 'F8RiDwAAQBAJ',
        isbn13: '9781789533767',
        isbn10: '1789533767'
      },
      binding: 'BOOK',
      pages: 254,
      authors: [
        'Matt R. Cole'
      ],
      coverUrl: 'http://books.google.com/books/content?id=F8RiDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=F8RiDwAAQBAJ',
          method: 'PUT'
        }
      }
    },
    DVxODwAAQBAJ: {
      title: 'Cracking Spring Microservices Interviews',
      description: 'This ebook discusses 100 plus real problems and their solutions for microservices architecture based on' +
        ' Spring Boot, Spring Cloud, Cloud Native Applications. It covers core concepts of microservices architecture, ' +
        'various design patterns, interview questions & answers, security in microservices, testing strategies and best ' +
        'practices in distributed system design. Table of Contents: 1. Core concepts related Spring powered microservices' +
        ' architecture 2. Introduction to Spring Boot, Spring Cloud, Cloud Native Applications, Netflix OSS 3. ' +
        'Design Patterns in microservices architecture - API Gateway, Hystrix, etc. 4. 100 plus Interview Questions 5.' +
        ' Security - OAuth2 and JWT 6. Testing Strategies in microservices architecture 7. Best Practices and common pitfalls',
      language: 'en',
      externalIdentifiers: {
        gbooksId: 'DVxODwAAQBAJ'
      },
      binding: 'BOOK',
      pages: 157,
      authors: [
        'Munish Chandel'
      ],
      coverUrl: 'http://books.google.com/books/content?id=DVxODwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=DVxODwAAQBAJ',
          method: 'PUT'
        }
      }
    },
    Qfd5DwAAQBAJ: {
      title: 'Microservices for the Enterprise',
      description: 'Understand the key challenges and solutions around building microservices in the enterprise application environment.' +
        ' This book provides a comprehensive understanding of microservices architectural principles and how to use microservices in ' +
        'real-world scenarios. Architectural challenges using microservices with service integration and API management are presented ' +
        'and you learn how to eliminate the use of centralized integration products such as the enterprise service bus (ESB) through ' +
        'the use of composite/integration microservices. Concepts in the book are supported with use cases, and emphasis is put on ' +
        'the reality that most of you are implementing in a “brownfield” environment in which you must implement microservices ' +
        'alongside legacy applications with minimal disruption to your business. Microservices for the Enterprise covers ' +
        'state-of-the-art techniques around microservices messaging, service development and description, service discovery, ' +
        'governance, and data management technologies and guides you through the microservices design process. ' +
        'Also included is the importance of organizing services as core versus atomic, composite versus integration,' +
        ' and API versus edge, and how such organization helps to eliminate the use of a central ESB and expose services' +
        ' through an API gateway. What You\'ll Learn Design and develop microservices architectures with confidence ' +
        'Put into practice the most modern techniques around messaging technologies Apply the Service Mesh pattern to overcome ' +
        'inter-service communication challenges Apply battle-tested microservices security patterns to address real-world scenarios' +
        ' Handle API management, decentralized data management, and observability Who This Book Is For Developers and DevOps engineers ' +
        'responsible for implementing applications around a microservices architecture, and architects and analysts who are designing' +
        ' such systems',
      language: 'en',
      externalIdentifiers: {
        gbooksId: 'Qfd5DwAAQBAJ',
        isbn13: '9781484238585',
        isbn10: '1484238583'
      },
      binding: 'BOOK',
      pages: 422,
      authors: [
        'Kasun Indrasiri',
        'Prabath Siriwardena'
      ],
      coverUrl: 'http://books.google.com/books/content?id=Qfd5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      alternatives: [],
      _links: {
        addToCollection: {
          href: '/latest/collections/exemplars?gbooksId=Qfd5DwAAQBAJ',
          method: 'PUT'
        }
      }
    }
  }
};

export const initialState: BookState = bookAdapter.getInitialState(defaultState);

export function bookReducer(state: BookState = initialState, action: BookActions) {

  switch (action.type) {
    case BookActionTypes.SearchBooksSuccess:
      return bookAdapter.addAll(action.books, state);

    case BookActionTypes.LoadBookSuccess:
      return bookAdapter.addOne(action.book, state);
    default:
      return state;
  }

}

export const getBookState = createFeatureSelector<BookState>('book');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bookAdapter.getSelectors(getBookState);

export const selectEntity = id => createSelector(
  selectEntities,
  entities => entities[id]
);

