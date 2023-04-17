import svelteLogo from '../assets/svelte.svg';

export const linkUtil = {
    logo: true,
    logoSrc:svelteLogo,
    logoLink:true,
    linkUrl: '#/',
    optionalLinkText: 'CampusRide',
    altText: 'Logo',
    links:[
        {url:'/driver',
        displayInNav: true,
        displayInFooter: true,
        linkText: 'Driver'
    },
    {url:'/passenger',
    displayInNav: true,
    displayInFooter: true,
    linkText: 'Passenger'
    },
    {url:'#/notfound',
    displayInNav: false,
    displayInFooter: false,
    linkText: ''
    },
    ]
}