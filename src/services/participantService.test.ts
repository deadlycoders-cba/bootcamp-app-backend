import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockAll = jest.fn<() => Promise<any[]>>();
const mockCreate = jest.fn<() => Promise<any>>();

jest.unstable_mockModule('../prisma/db.js', () => ({
  db: {
    orm: {
      public: {
        Participants: {
          all: mockAll,
          create: mockCreate,
        },
      },
    },
  },
}));

const { db } = await import('../prisma/db.js');
const {
  createParticipant,
  getActiveParticipantCount,
  getAllParticipants,
} = await import('./participantService.js');


beforeEach(() => {
  mockAll.mockReset();
  mockCreate.mockReset();
});

describe('getAllParticipants', () => {
  it('returns participants from the database', async () => {
    // arrange
    mockAll.mockResolvedValue([
      {
        id: 1,
        name: 'Jordan Smith',
        stream: 'Engineering',
        isActive: true,
      },
    ]);
    // act
    const result = await getAllParticipants();
    // assert
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Jordan Smith');
  });
});

describe('createParticipant', () => {
  it('creates a participant with trimmed name and stream values', async () => {
    // arrange
    const createdParticipant = {
      id: 3,
      name: 'Alex',
      stream: 'Cyber',
      isActive: true,
    };
    // act
    mockCreate.mockResolvedValue(createdParticipant);

    const result = await createParticipant('  Alex  ', '  Cyber  ');
    // assert
    expect(result.name).toBe('Alex');
    expect(result.stream).toBe('Cyber');
    expect(result).toEqual(createdParticipant);
  });
});

describe('getActiveParticipantCount', () => {
  it('counts only active participants', async () => {
    // arrange
    mockAll.mockResolvedValue([
      {
        id: 1,
        name: 'Jordan',
        stream: 'Engineering',
        isActive: true,
      },
      {
        id: 2,
        name: 'Sam',
        stream: 'Data',
        isActive: false,
      },
      {
        id: 3,
        name: 'Alex',
        stream: 'Cyber',
        isActive: true,
      },
    ]);
    // act
    const result = await getActiveParticipantCount();
    // assert
    expect(result).toBe(2);
  });
});
