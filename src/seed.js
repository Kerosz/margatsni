/* eslint-disable no-plusplus */
// NOTE: replace '8R0tk6J0H4OQ84CQncU4IqksxNE2' (it's used in 3 places) with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: '8R0tk6J0H4OQ84CQncU4IqksxNE2',
      username: 'kerosz',
      userInfo: {
        fullName: 'Chirila Andrei',
        website: 'https://chirila.dev',
        bio: 'dev by day, sudo dev by night',
        phoneNumber: '',
      },
      emailAddress: 'andrei@chirila.dev',
      following: ['b0ec726b-b416-41b5-b05a-0f3178f55088'],
      followers: ['6cea0fdc-b8f7-4ebd-b03a-060e47fadcee'],
      photoURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
      verifiedUser: true,
      privateProfile: false,
      savedPosts: [],
      allowSuggestions: true,
      dateCreated: Date.now(),
    },
    {
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
      username: 'raphael',
      userInfo: {
        fullName: 'Raffaello Sanzio da Urbino',
        website: 'https://it.wikipedia.org/wiki/Raffaello_Sanzio',
        bio: '20| painter/artist| singer songwriter',
        phoneNumber: '',
      },
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['8R0tk6J0H4OQ84CQncU4IqksxNE2'],
      photoURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/raphael_cfskar.jpg',
      verifiedUser: false,
      privateProfile: false,
      savedPosts: [],
      allowSuggestions: true,
      dateCreated: Date.now(),
    },
    {
      userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
      username: 'dali',
      userInfo: {
        fullName: 'Salvador Dalí',
        website: 'https://en.wikipedia.org/wiki/Salvador_Dal%C3%AD',
        bio: 'Recovering cake addict',
        phoneNumber: '',
      },
      emailAddress: 'salvador@dali.com',
      following: ['8R0tk6J0H4OQ84CQncU4IqksxNE2'],
      followers: [],
      photoURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
      verifiedUser: true,
      privateProfile: false,
      savedPosts: [],
      allowSuggestions: true,
      dateCreated: Date.now(),
    },
    {
      userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
      username: 'orwell',
      userInfo: {
        fullName: 'George Orwell',
        website: '',
        bio: 'It won’t always be easy, but always try to do what’s right',
        phoneNumber: '',
      },
      emailAddress: 'george@orwell.com',
      following: [],
      followers: [],
      photoURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
      verifiedUser: false,
      privateProfile: false,
      savedPosts: [],
      allowSuggestions: true,
      dateCreated: Date.now(),
    },
  ];

  const posts = [
    {
      caption: 'Night Walking Dreams',
      comments: [
        {
          commentId: 'b1ee18a0-af59-472c-946c-cc9ed538a831',
          userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
          comment: 'Would you mind if I used this picture?',
          username: 'orwell',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
          dateCreated: Date.now(),
        },
        {
          commentId: '20307aaa-7e49-42a9-b104-ec5d057b08b4',
          userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
          comment: 'Love this place, looks like my animal farm!',
          username: 'dali',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
          dateCreated: Date.now(),
        },
      ],
      dateCreated: Date.now(),
      imageSrc:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/4_bglbad.jpg',
      sourceURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/4_bglbad.jpg',
      likes: [],
      saved: [],
      photoId: '34ee2574-e3c3-4bec-9246-f2995705449b',
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
    },
    {
      caption: 'Saint George and the Dragon',
      comments: [
        {
          commentId: '1ea20bf4-d11e-454a-b224-064fb0d4fb7c',
          userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
          comment: 'Would you mind if I used this picture?',
          username: 'orwell',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
          dateCreated: Date.now(),
        },
        {
          commentId: '32c51a7d-a7ff-46f0-9a67-42601e290ded',
          userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
          comment: 'Love this place, looks like my animal farm!',
          username: 'dali',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
          dateCreated: Date.now(),
        },
      ],
      dateCreated: Date.now(),
      imageSrc:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/1_u31jwk.jpg',
      sourceURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/1_u31jwk.jpg',
      likes: [],
      saved: [],
      photoId: '93945971-5949-4ed9-b876-967507479c04',
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
    },
    {
      caption: 'It’s my time to step into the spotlight. I’ve earned it.',
      comments: [
        {
          commentId: '41460959-ce97-4402-8c8a-2b207da794a2',
          userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
          comment: 'Currently saying yes to new adventures',
          username: 'orwell',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
          dateCreated: Date.now(),
        },
        {
          commentId: '3f1937c2-7dad-4478-a81b-96b2f0a14756',
          userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
          comment: 'Happiness never goes out of style',
          username: 'dali',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
          dateCreated: Date.now(),
        },
      ],
      dateCreated: Date.now(),
      imageSrc:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/2_uweupy.jpg',
      sourceURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/2_uweupy.jpg',
      likes: [],
      saved: [],
      photoId: '85e8b3dc-05d7-4ab6-958e-f4f3d8907576',
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
    },
    {
      caption: 'Not like the rest of them',
      comments: [
        {
          commentId: '9152247f-8655-48b8-bb78-e772e611b6d6',
          userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
          comment: 'Too glam to give a damn',
          username: 'orwell',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
          dateCreated: Date.now(),
        },
        {
          commentId: '6f856422-27a4-44f0-af6a-4bf7515738eb',
          userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
          comment: 'Together we could be unstoppable',
          username: 'dali',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
          dateCreated: Date.now(),
        },
      ],
      dateCreated: Date.now(),
      imageSrc:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/5_naf3dg.jpg',
      sourceURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/5_naf3dg.jpg',
      likes: [],
      saved: [],
      photoId: '53690fab-5b12-476b-8e6b-fac0fefac68e',
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
    },
    {
      caption: 'No one’s life is as perfect as their Instagram feed',
      comments: [
        {
          commentId: '8731c84f-ca3f-4ff3-8385-3c7482e2a436',
          userId: '4298d7ff-1b81-4e2f-a9e4-66c34812d75e',
          comment: 'When you feel like giving up, keep going',
          username: 'orwell',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/orwell_vfvt5n.jpg',
          dateCreated: Date.now(),
        },
        {
          commentId: '7cefd855-97ff-4aff-ae6c-fdce137005ba',
          userId: '6cea0fdc-b8f7-4ebd-b03a-060e47fadcee',
          comment: 'Sharing my happy thoughts',
          username: 'dali',
          photoURL:
            'https://res.cloudinary.com/kerosz/image/upload/v1615445057/instagram/avatars/dali_pezrzv.jpg',
          dateCreated: Date.now(),
        },
      ],
      dateCreated: Date.now(),
      imageSrc:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/3_zrrkss.jpg',
      sourceURL:
        'https://res.cloudinary.com/kerosz/image/upload/v1615462061/instagram/posts/raphael/3_zrrkss.jpg',
      likes: [],
      saved: [],
      photoId: 'd6bdd4dd-2eb4-4e7c-9152-794b51d354b6',
      userId: 'b0ec726b-b416-41b5-b05a-0f3178f55088',
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 0; i <= posts.length; ++i) {
    firebase.firestore().collection('photos').add(posts[i]);
  }
}
