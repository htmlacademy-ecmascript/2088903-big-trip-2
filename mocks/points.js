import { getRandomArrayElement } from '../src/utils/get-random-array-element';

const points = [
  {
    'id': '3d5eb2ac-2914-4fe0-ac50-d2dd6999ecc2',
    'base_price': 9649,
    'date_from': '2025-08-28T06:20:25.881Z',
    'date_to': '2025-08-28T23:52:25.881Z',
    'destination': '3a8ed844-247b-48cd-8142-4827483eb3d0',
    'is_favorite': false,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': '7dcef3dd-7350-4db5-b5ff-730ffb8030d5',
    'base_price': 4292,
    'date_from': '2025-08-29T11:09:25.881Z',
    'date_to': '2025-08-31T09:56:25.881Z',
    'destination': '31a35bc7-4447-4aa2-8188-4f6b6ac8b60d',
    'is_favorite': true,
    'offers': [
      '3200f415-d00b-4883-a551-216bb721dc97'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'df7aa786-ddcc-41ae-a849-26c6bd029930',
    'base_price': 5935,
    'date_from': '2025-09-02T00:27:25.881Z',
    'date_to': '2025-09-02T20:40:25.881Z',
    'destination': '89e3b45b-5baa-4175-97b8-f18066211358',
    'is_favorite': false,
    'offers': [
      'ec56766d-569e-4fa9-a727-9d7fd7c24083',
      'ecce02cf-41fe-4a4d-b681-3e67b6ada4b2',
      '0fff99a3-1079-4e39-a318-ec550c578658',
      '43adbc11-0e2e-4eec-8fe1-af5fe4b60296',
      'fabcc301-b66d-4fd1-afc6-3e71f25d0b62'
    ],
    'type': 'check-in'
  },
  {
    'id': 'cd6cd5cd-a90c-4338-b81b-7c45a62f0bd9',
    'base_price': 8342,
    'date_from': '2025-09-03T13:10:25.881Z',
    'date_to': '2025-09-04T10:58:25.881Z',
    'destination': '7a57383e-4b4f-4989-8776-d596e3f1fefb',
    'is_favorite': false,
    'offers': [
      'fb8ecb8e-950e-437c-a3f0-7a952e6955a1',
      'c0213272-d4fb-47eb-a27c-1b326b7dab84',
      '0b387eae-2174-4388-8d42-62c0eb176f36'
    ],
    'type': 'train'
  },
  {
    'id': '15b45aa2-094c-4e8f-ad37-55f98fd0b0bf',
    'base_price': 8922,
    'date_from': '2025-09-05T22:37:25.881Z',
    'date_to': '2025-09-07T10:23:25.881Z',
    'destination': '54208bfe-e407-4cf3-9f05-b390a70ddf92',
    'is_favorite': false,
    'offers': [
      'f069d7d8-3401-4d07-a79c-8a593f4eb657',
      '97617b13-c2d1-4e43-b3b2-bb85ecead025',
      '99e936bf-dbc5-49a3-97a4-9d3a7b3a3a4e',
      '89f08ddc-ca31-434a-9951-122b5bf34434',
      'e4b7a084-dd09-4ea4-a5cf-269f068effbf'
    ],
    'type': 'ship'
  },
  {
    'id': '071c7e7e-fec9-4e4f-a6e3-2fc72db70e1a',
    'base_price': 9132,
    'date_from': '2025-09-08T22:48:25.881Z',
    'date_to': '2025-09-10T07:22:25.881Z',
    'destination': 'e4392127-bfc6-429f-b636-180d55590a9a',
    'is_favorite': true,
    'offers': [
      '9bbf2d0b-1d6f-41a7-8aea-b920e437a430',
      '69ccbb6b-2c9f-4f50-aea1-43a40c67767b'
    ],
    'type': 'drive'
  },
  {
    'id': '56b198b5-05bd-4503-8994-f66dd5cbc47d',
    'base_price': 6954,
    'date_from': '2025-09-11T13:25:25.881Z',
    'date_to': '2025-09-13T06:10:25.881Z',
    'destination': '54208bfe-e407-4cf3-9f05-b390a70ddf92',
    'is_favorite': false,
    'offers': [
      '2fdddb4f-b0c9-405c-be9d-7a8543230662',
      'e70d121c-482b-4ef5-84d3-a2f8f9f96aea',
      '7a2d676b-1d46-42d0-9e5c-f80cd67c70af',
      '94496492-4d0b-453f-95d1-cec3e82c08f3'
    ],
    'type': 'taxi'
  },
  {
    'id': 'b0de5e74-ff33-4ab9-a446-20ce5d6f4f22',
    'base_price': 467,
    'date_from': '2025-09-13T17:57:25.881Z',
    'date_to': '2025-09-14T21:06:25.881Z',
    'destination': '7a57383e-4b4f-4989-8776-d596e3f1fefb',
    'is_favorite': false,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '7f815e98-5060-4c38-ae0c-0267d5b76cd7',
    'base_price': 1210,
    'date_from': '2025-09-15T12:27:25.881Z',
    'date_to': '2025-09-16T16:24:25.881Z',
    'destination': 'ef58fd9a-9ade-43e4-acf4-f1032b333316',
    'is_favorite': false,
    'offers': [
      '94496492-4d0b-453f-95d1-cec3e82c08f3'
    ],
    'type': 'taxi'
  },
  {
    'id': '1b7c1aa8-14e6-4ba9-a07b-8facbcc6bfc6',
    'base_price': 6904,
    'date_from': '2025-09-16T23:52:25.881Z',
    'date_to': '2025-09-18T02:04:25.881Z',
    'destination': 'a7ff70b0-98f2-4640-9f1c-e4232b8b18a6',
    'is_favorite': false,
    'offers': [
      'fb8ecb8e-950e-437c-a3f0-7a952e6955a1',
      'c0213272-d4fb-47eb-a27c-1b326b7dab84',
      '0b387eae-2174-4388-8d42-62c0eb176f36'
    ],
    'type': 'train'
  },
  {
    'id': 'b0d3c88d-68b6-48de-9f05-62148c5dba09',
    'base_price': 3029,
    'date_from': '2025-09-19T07:41:25.881Z',
    'date_to': '2025-09-21T06:17:25.881Z',
    'destination': '3a8ed844-247b-48cd-8142-4827483eb3d0',
    'is_favorite': true,
    'offers': [
      '317bae34-39b1-4082-bbc5-2aca968d8f03',
      'f069d7d8-3401-4d07-a79c-8a593f4eb657',
      '97617b13-c2d1-4e43-b3b2-bb85ecead025',
      '99e936bf-dbc5-49a3-97a4-9d3a7b3a3a4e',
      '89f08ddc-ca31-434a-9951-122b5bf34434',
      'e4b7a084-dd09-4ea4-a5cf-269f068effbf'
    ],
    'type': 'ship'
  },
  {
    'id': 'aa0a7505-b5b9-4dd0-8786-c25580397bde',
    'base_price': 7126,
    'date_from': '2025-09-22T06:53:25.881Z',
    'date_to': '2025-09-23T18:09:25.881Z',
    'destination': '54208bfe-e407-4cf3-9f05-b390a70ddf92',
    'is_favorite': true,
    'offers': [
      '0fff99a3-1079-4e39-a318-ec550c578658',
      '43adbc11-0e2e-4eec-8fe1-af5fe4b60296',
      'fabcc301-b66d-4fd1-afc6-3e71f25d0b62'
    ],
    'type': 'check-in'
  },
  {
    'id': 'c5a391f6-1048-4940-96c6-ea8de114e620',
    'base_price': 5280,
    'date_from': '2025-09-24T00:10:25.881Z',
    'date_to': '2025-09-24T11:56:25.881Z',
    'destination': 'e197a997-451f-476e-9621-9abba604c199',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '171d59eb-86b0-42fc-b141-ad21d83dd4f7',
    'base_price': 5302,
    'date_from': '2025-09-26T00:10:25.881Z',
    'date_to': '2025-09-27T09:37:25.881Z',
    'destination': '7a57383e-4b4f-4989-8776-d596e3f1fefb',
    'is_favorite': true,
    'offers': [
      '64d53ffb-aeb8-4e23-8fd4-d56a4c6de54e',
      'a8f4cda7-0a53-4271-ac7c-1aa907f54d7f',
      'def3a43f-0606-4ef2-8985-27a4c5c172f8',
      '66354ae8-3666-46f8-a39c-eb9b01050232'
    ],
    'type': 'flight'
  },
  {
    'id': '9344214e-f02b-4842-935c-c1252feec7a8',
    'base_price': 7612,
    'date_from': '2025-09-28T15:30:25.881Z',
    'date_to': '2025-09-30T15:57:25.881Z',
    'destination': 'a7ff70b0-98f2-4640-9f1c-e4232b8b18a6',
    'is_favorite': true,
    'offers': [
      'c0213272-d4fb-47eb-a27c-1b326b7dab84',
      '0b387eae-2174-4388-8d42-62c0eb176f36'
    ],
    'type': 'train'
  },
  {
    'id': '17920785-97a2-4be8-be56-9a8913df522b',
    'base_price': 8312,
    'date_from': '2025-10-02T01:12:25.881Z',
    'date_to': '2025-10-02T17:09:25.881Z',
    'destination': '31a35bc7-4447-4aa2-8188-4f6b6ac8b60d',
    'is_favorite': false,
    'offers': [
      'def3a43f-0606-4ef2-8985-27a4c5c172f8',
      '66354ae8-3666-46f8-a39c-eb9b01050232'
    ],
    'type': 'flight'
  },
  {
    'id': '0b3d4e36-eb32-41bb-bc5d-6a1de69d1d34',
    'base_price': 5526,
    'date_from': '2025-10-04T09:41:25.881Z',
    'date_to': '2025-10-05T03:39:25.881Z',
    'destination': '7a57383e-4b4f-4989-8776-d596e3f1fefb',
    'is_favorite': true,
    'offers': [
      '97617b13-c2d1-4e43-b3b2-bb85ecead025',
      '99e936bf-dbc5-49a3-97a4-9d3a7b3a3a4e',
      '89f08ddc-ca31-434a-9951-122b5bf34434',
      'e4b7a084-dd09-4ea4-a5cf-269f068effbf'
    ],
    'type': 'ship'
  },
  {
    'id': 'b0a424d2-bfc5-45e7-9efa-6c139de41cba',
    'base_price': 7115,
    'date_from': '2025-10-06T10:10:25.881Z',
    'date_to': '2025-10-06T19:08:25.881Z',
    'destination': '89e3b45b-5baa-4175-97b8-f18066211358',
    'is_favorite': false,
    'offers': [
      'c8fb41d5-0b51-4f78-b0f9-4d047cc5a4ce',
      '3200f415-d00b-4883-a551-216bb721dc97'
    ],
    'type': 'restaurant'
  },
  {
    'id': '0725125a-f184-4e5a-a615-0e44ac910d13',
    'base_price': 5135,
    'date_from': '2025-10-08T05:52:25.881Z',
    'date_to': '2025-10-08T19:32:25.881Z',
    'destination': 'e4392127-bfc6-429f-b636-180d55590a9a',
    'is_favorite': true,
    'offers': [
      'ec56766d-569e-4fa9-a727-9d7fd7c24083',
      'ecce02cf-41fe-4a4d-b681-3e67b6ada4b2',
      '0fff99a3-1079-4e39-a318-ec550c578658',
      '43adbc11-0e2e-4eec-8fe1-af5fe4b60296',
      'fabcc301-b66d-4fd1-afc6-3e71f25d0b62'
    ],
    'type': 'check-in'
  },
  {
    'id': 'cea9bf8d-9fb3-44f5-97aa-f3d9682e7f0f',
    'base_price': 1143,
    'date_from': '2025-10-10T20:05:25.881Z',
    'date_to': '2025-10-11T09:11:25.881Z',
    'destination': 'e197a997-451f-476e-9621-9abba604c199',
    'is_favorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '4c2e41c0-f690-4070-ba52-13c191ab52c7',
    'base_price': 3037,
    'date_from': '2025-10-13T00:22:25.881Z',
    'date_to': '2025-10-14T20:10:25.881Z',
    'destination': 'e4392127-bfc6-429f-b636-180d55590a9a',
    'is_favorite': true,
    'offers': [
      'ecce02cf-41fe-4a4d-b681-3e67b6ada4b2',
      '0fff99a3-1079-4e39-a318-ec550c578658',
      '43adbc11-0e2e-4eec-8fe1-af5fe4b60296',
      'fabcc301-b66d-4fd1-afc6-3e71f25d0b62'
    ],
    'type': 'check-in'
  },
  {
    'id': 'c7e3293c-413c-4dd2-96fe-1109254ae8f0',
    'base_price': 883,
    'date_from': '2025-10-15T13:18:25.881Z',
    'date_to': '2025-10-16T10:47:25.881Z',
    'destination': 'e4392127-bfc6-429f-b636-180d55590a9a',
    'is_favorite': true,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': '372d25bb-411a-4827-ad60-c4837e54d1f2',
    'base_price': 2899,
    'date_from': '2025-10-17T07:13:25.881Z',
    'date_to': '2025-10-17T22:08:25.881Z',
    'destination': 'e197a997-451f-476e-9621-9abba604c199',
    'is_favorite': true,
    'offers': [
      '2fdddb4f-b0c9-405c-be9d-7a8543230662',
      'e70d121c-482b-4ef5-84d3-a2f8f9f96aea',
      '7a2d676b-1d46-42d0-9e5c-f80cd67c70af',
      '94496492-4d0b-453f-95d1-cec3e82c08f3'
    ],
    'type': 'taxi'
  },
  {
    'id': '74324528-b2d0-4ebb-b8c7-57a84bc2add7',
    'base_price': 7188,
    'date_from': '2025-10-19T17:40:25.881Z',
    'date_to': '2025-10-21T07:30:25.881Z',
    'destination': 'a7ff70b0-98f2-4640-9f1c-e4232b8b18a6',
    'is_favorite': false,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': 'c3b64bf8-268c-49da-818a-3a999169cf6d',
    'base_price': 9049,
    'date_from': '2025-10-22T21:18:25.881Z',
    'date_to': '2025-10-24T17:00:25.881Z',
    'destination': '7a57383e-4b4f-4989-8776-d596e3f1fefb',
    'is_favorite': true,
    'offers': [
      '2fdddb4f-b0c9-405c-be9d-7a8543230662',
      'e70d121c-482b-4ef5-84d3-a2f8f9f96aea',
      '7a2d676b-1d46-42d0-9e5c-f80cd67c70af',
      '94496492-4d0b-453f-95d1-cec3e82c08f3'
    ],
    'type': 'taxi'
  }
];

const getRandomPoint = () => getRandomArrayElement(points);

export { getRandomPoint };
