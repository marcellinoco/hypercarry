import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tournament
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tournamentAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'AlreadyRegistered' },
  { type: 'error', inputs: [], name: 'InvalidFee' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidParticipants' },
  { type: 'error', inputs: [], name: 'InvalidPlayerCount' },
  { type: 'error', inputs: [], name: 'InvalidPlayers' },
  { type: 'error', inputs: [], name: 'InvalidPrizePool' },
  { type: 'error', inputs: [], name: 'InvalidRegistrationFee' },
  { type: 'error', inputs: [], name: 'InvalidTimestamp' },
  { type: 'error', inputs: [], name: 'MatchAlreadyPlayed' },
  { type: 'error', inputs: [], name: 'MaxParticipantsReached' },
  { type: 'error', inputs: [], name: 'NoFeeToWithdraw' },
  { type: 'error', inputs: [], name: 'NoPrizeToWithdraw' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'PlayerScoreMismatch' },
  { type: 'error', inputs: [], name: 'TournamentAlreadyEnded' },
  { type: 'error', inputs: [], name: 'TournamentAlreadyStarted' },
  { type: 'error', inputs: [], name: 'TournamentNotEnded' },
  { type: 'error', inputs: [], name: 'TournamentNotStarted' },
  { type: 'error', inputs: [], name: 'WithdrawFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'organizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeeWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'matchId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'players',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'scores',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'MatchResultSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PlayerRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'position',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PrizeDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PrizeWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'organizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TournamentCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TournamentEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TournamentStarted',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ORGANIZER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endTournament',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tournamentId', internalType: 'uint256', type: 'uint256' },
      { name: '_organizer', internalType: 'address', type: 'address' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' },
      { name: '_maxParticipants', internalType: 'uint256', type: 'uint256' },
      { name: '_registrationFee', internalType: 'uint256', type: 'uint256' },
      { name: '_organizerFee', internalType: 'uint256', type: 'uint256' },
      {
        name: '_prizePoolPercentages',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEnded',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isParticipant',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isStarted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'matches',
    outputs: [
      { name: 'matchId', internalType: 'uint256', type: 'uint256' },
      { name: 'isPlayed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxParticipants',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'organizer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'organizerFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'participants',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'playerStats',
    outputs: [
      { name: 'totalScore', internalType: 'uint256', type: 'uint256' },
      { name: 'matchesPlayed', internalType: 'uint256', type: 'uint256' },
      { name: 'averagePosition', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'positions',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'prizeBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'prizePoolPercentages',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registrationFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startTournament',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'matchId', internalType: 'uint256', type: 'uint256' },
      { name: 'players', internalType: 'address[]', type: 'address[]' },
      { name: 'scores', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'submitMatchResult',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tournamentId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawPrize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TournamentFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tournamentFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tournamentAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tournamentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'organizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TournamentCreated',
  },
  {
    type: 'function',
    inputs: [
      { name: 'organizer', internalType: 'address', type: 'address' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'maxParticipants', internalType: 'uint256', type: 'uint256' },
      { name: 'registrationFee', internalType: 'uint256', type: 'uint256' },
      { name: 'organizerFee', internalType: 'uint256', type: 'uint256' },
      {
        name: 'prizePoolPercentages',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    name: 'createTournament',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tournaments',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tournamentsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__
 */
export const useReadTournament = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadTournamentDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"ORGANIZER_ROLE"`
 */
export const useReadTournamentOrganizerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'ORGANIZER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"endTime"`
 */
export const useReadTournamentEndTime = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'endTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"feeBalance"`
 */
export const useReadTournamentFeeBalance = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'feeBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadTournamentGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadTournamentHasRole = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"isEnded"`
 */
export const useReadTournamentIsEnded = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'isEnded',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"isParticipant"`
 */
export const useReadTournamentIsParticipant =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'isParticipant',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"isStarted"`
 */
export const useReadTournamentIsStarted = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'isStarted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"matches"`
 */
export const useReadTournamentMatches = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'matches',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"maxParticipants"`
 */
export const useReadTournamentMaxParticipants =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'maxParticipants',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"organizer"`
 */
export const useReadTournamentOrganizer = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'organizer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"organizerFee"`
 */
export const useReadTournamentOrganizerFee =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'organizerFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"participants"`
 */
export const useReadTournamentParticipants =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'participants',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"playerStats"`
 */
export const useReadTournamentPlayerStats = /*#__PURE__*/ createUseReadContract(
  { abi: tournamentAbi, functionName: 'playerStats' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"positions"`
 */
export const useReadTournamentPositions = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'positions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"prizeBalance"`
 */
export const useReadTournamentPrizeBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'prizeBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"prizePoolPercentages"`
 */
export const useReadTournamentPrizePoolPercentages =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'prizePoolPercentages',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"registrationFee"`
 */
export const useReadTournamentRegistrationFee =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'registrationFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"startTime"`
 */
export const useReadTournamentStartTime = /*#__PURE__*/ createUseReadContract({
  abi: tournamentAbi,
  functionName: 'startTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadTournamentSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"tournamentId"`
 */
export const useReadTournamentTournamentId =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentAbi,
    functionName: 'tournamentId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__
 */
export const useWriteTournament = /*#__PURE__*/ createUseWriteContract({
  abi: tournamentAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"endTournament"`
 */
export const useWriteTournamentEndTournament =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'endTournament',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteTournamentGrantRole = /*#__PURE__*/ createUseWriteContract(
  { abi: tournamentAbi, functionName: 'grantRole' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteTournamentInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"register"`
 */
export const useWriteTournamentRegister = /*#__PURE__*/ createUseWriteContract({
  abi: tournamentAbi,
  functionName: 'register',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteTournamentRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteTournamentRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"startTournament"`
 */
export const useWriteTournamentStartTournament =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'startTournament',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"submitMatchResult"`
 */
export const useWriteTournamentSubmitMatchResult =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'submitMatchResult',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"withdrawFee"`
 */
export const useWriteTournamentWithdrawFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'withdrawFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"withdrawPrize"`
 */
export const useWriteTournamentWithdrawPrize =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentAbi,
    functionName: 'withdrawPrize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__
 */
export const useSimulateTournament = /*#__PURE__*/ createUseSimulateContract({
  abi: tournamentAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"endTournament"`
 */
export const useSimulateTournamentEndTournament =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'endTournament',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateTournamentGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateTournamentInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateTournamentRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateTournamentRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateTournamentRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"startTournament"`
 */
export const useSimulateTournamentStartTournament =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'startTournament',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"submitMatchResult"`
 */
export const useSimulateTournamentSubmitMatchResult =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'submitMatchResult',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"withdrawFee"`
 */
export const useSimulateTournamentWithdrawFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'withdrawFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentAbi}__ and `functionName` set to `"withdrawPrize"`
 */
export const useSimulateTournamentWithdrawPrize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentAbi,
    functionName: 'withdrawPrize',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__
 */
export const useWatchTournamentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tournamentAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"FeeWithdrawn"`
 */
export const useWatchTournamentFeeWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'FeeWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchTournamentInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"MatchResultSubmitted"`
 */
export const useWatchTournamentMatchResultSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'MatchResultSubmitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"PlayerRegistered"`
 */
export const useWatchTournamentPlayerRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'PlayerRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"PrizeDistributed"`
 */
export const useWatchTournamentPrizeDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'PrizeDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"PrizeWithdrawn"`
 */
export const useWatchTournamentPrizeWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'PrizeWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchTournamentRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchTournamentRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchTournamentRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"TournamentCreated"`
 */
export const useWatchTournamentTournamentCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'TournamentCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"TournamentEnded"`
 */
export const useWatchTournamentTournamentEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'TournamentEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentAbi}__ and `eventName` set to `"TournamentStarted"`
 */
export const useWatchTournamentTournamentStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentAbi,
    eventName: 'TournamentStarted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentFactoryAbi}__
 */
export const useReadTournamentFactory = /*#__PURE__*/ createUseReadContract({
  abi: tournamentFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"implementation"`
 */
export const useReadTournamentFactoryImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentFactoryAbi,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTournamentFactoryOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentFactoryAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"tournaments"`
 */
export const useReadTournamentFactoryTournaments =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentFactoryAbi,
    functionName: 'tournaments',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"tournamentsCount"`
 */
export const useReadTournamentFactoryTournamentsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: tournamentFactoryAbi,
    functionName: 'tournamentsCount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentFactoryAbi}__
 */
export const useWriteTournamentFactory = /*#__PURE__*/ createUseWriteContract({
  abi: tournamentFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"createTournament"`
 */
export const useWriteTournamentFactoryCreateTournament =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentFactoryAbi,
    functionName: 'createTournament',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTournamentFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTournamentFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tournamentFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentFactoryAbi}__
 */
export const useSimulateTournamentFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: tournamentFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"createTournament"`
 */
export const useSimulateTournamentFactoryCreateTournament =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentFactoryAbi,
    functionName: 'createTournament',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTournamentFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTournamentFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tournamentFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentFactoryAbi}__
 */
export const useWatchTournamentFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tournamentFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTournamentFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tournamentFactoryAbi}__ and `eventName` set to `"TournamentCreated"`
 */
export const useWatchTournamentFactoryTournamentCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tournamentFactoryAbi,
    eventName: 'TournamentCreated',
  })
