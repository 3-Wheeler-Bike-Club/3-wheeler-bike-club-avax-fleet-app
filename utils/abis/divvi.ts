export const divviAbi = [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "AccessControlBadConfirmation",
      "type": "error",
      "inputs": []
    },
    {
      "name": "AccessControlEnforcedDefaultAdminDelay",
      "type": "error",
      "inputs": [
        {
          "name": "schedule",
          "type": "uint48",
          "internalType": "uint48"
        }
      ]
    },
    {
      "name": "AccessControlEnforcedDefaultAdminRules",
      "type": "error",
      "inputs": []
    },
    {
      "name": "AccessControlInvalidDefaultAdmin",
      "type": "error",
      "inputs": [
        {
          "name": "defaultAdmin",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "AccessControlUnauthorizedAccount",
      "type": "error",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "neededRole",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "name": "AddressEmptyCode",
      "type": "error",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "AgreementAlreadyExists",
      "type": "error",
      "inputs": [
        {
          "name": "provider",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "consumer",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "ERC1967InvalidImplementation",
      "type": "error",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "ERC1967NonPayable",
      "type": "error",
      "inputs": []
    },
    {
      "name": "EntityAlreadyExists",
      "type": "error",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "EntityDoesNotExist",
      "type": "error",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "FailedCall",
      "type": "error",
      "inputs": []
    },
    {
      "name": "InvalidInitialization",
      "type": "error",
      "inputs": []
    },
    {
      "name": "NotInitializing",
      "type": "error",
      "inputs": []
    },
    {
      "name": "ProviderRequiresApproval",
      "type": "error",
      "inputs": [
        {
          "name": "provider",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "name": "SafeCastOverflowedUintDowncast",
      "type": "error",
      "inputs": [
        {
          "name": "bits",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "name": "UUPSUnauthorizedCallContext",
      "type": "error",
      "inputs": []
    },
    {
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error",
      "inputs": [
        {
          "name": "slot",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "name": "DefaultAdminDelayChangeCanceled",
      "type": "event",
      "inputs": [],
      "anonymous": false
    },
    {
      "name": "DefaultAdminDelayChangeScheduled",
      "type": "event",
      "inputs": [
        {
          "name": "newDelay",
          "type": "uint48",
          "indexed": false,
          "internalType": "uint48"
        },
        {
          "name": "effectSchedule",
          "type": "uint48",
          "indexed": false,
          "internalType": "uint48"
        }
      ],
      "anonymous": false
    },
    {
      "name": "DefaultAdminTransferCanceled",
      "type": "event",
      "inputs": [],
      "anonymous": false
    },
    {
      "name": "DefaultAdminTransferScheduled",
      "type": "event",
      "inputs": [
        {
          "name": "newAdmin",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "acceptSchedule",
          "type": "uint48",
          "indexed": false,
          "internalType": "uint48"
        }
      ],
      "anonymous": false
    },
    {
      "name": "Initialized",
      "type": "event",
      "inputs": [
        {
          "name": "version",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        }
      ],
      "anonymous": false
    },
    {
      "name": "ReferralRegistered",
      "type": "event",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "rewardsProvider",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "rewardsConsumer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "chainId",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "txHash",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "name": "ReferralSkipped",
      "type": "event",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "rewardsProvider",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "rewardsConsumer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "chainId",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "txHash",
          "type": "bytes32",
          "indexed": false,
          "internalType": "bytes32"
        },
        {
          "name": "status",
          "type": "uint8",
          "indexed": false,
          "internalType": "enum DivviRegistry.ReferralStatus"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RequiresApprovalForRewardsAgreements",
      "type": "event",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "requiresApproval",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RewardsAgreementRegistered",
      "type": "event",
      "inputs": [
        {
          "name": "rewardsProvider",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "rewardsConsumer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RewardsEntityRegistered",
      "type": "event",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "requiresApproval",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RoleAdminChanged",
      "type": "event",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "previousAdminRole",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "newAdminRole",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RoleGranted",
      "type": "event",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "RoleRevoked",
      "type": "event",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "Upgraded",
      "type": "event",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "name": "DEFAULT_ADMIN_ROLE",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "REFERRAL_REGISTRAR_ROLE",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "TRUSTED_FORWARDER_ROLE",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "UPGRADE_INTERFACE_VERSION",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "acceptDefaultAdminTransfer",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "batchRegisterReferral",
      "type": "function",
      "inputs": [
        {
          "name": "referrals",
          "type": "tuple[]",
          "components": [
            {
              "name": "user",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "rewardsProvider",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "rewardsConsumer",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "txHash",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "chainId",
              "type": "string",
              "internalType": "string"
            }
          ],
          "internalType": "struct DivviRegistry.ReferralData[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "beginDefaultAdminTransfer",
      "type": "function",
      "inputs": [
        {
          "name": "newAdmin",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "cancelDefaultAdminTransfer",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "changeDefaultAdminDelay",
      "type": "function",
      "inputs": [
        {
          "name": "newDelay",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "defaultAdmin",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "defaultAdminDelay",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "defaultAdminDelayIncreaseWait",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getReferringConsumer",
      "type": "function",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "provider",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "consumer",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getRoleAdmin",
      "type": "function",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "grantRole",
      "type": "function",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "hasAgreement",
      "type": "function",
      "inputs": [
        {
          "name": "provider",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "consumer",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "exists",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "hasRole",
      "type": "function",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "initialize",
      "type": "function",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "transferDelay",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "isEntityRegistered",
      "type": "function",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "registered",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "isTrustedForwarder",
      "type": "function",
      "inputs": [
        {
          "name": "forwarder",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "isUserReferredToProvider",
      "type": "function",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "provider",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "isReferred",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "owner",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "pendingDefaultAdmin",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "newAdmin",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "schedule",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "pendingDefaultAdminDelay",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "newDelay",
          "type": "uint48",
          "internalType": "uint48"
        },
        {
          "name": "schedule",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "proxiableUUID",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "registerAgreementAsConsumer",
      "type": "function",
      "inputs": [
        {
          "name": "rewardsProvider",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "registerAgreementAsProvider",
      "type": "function",
      "inputs": [
        {
          "name": "rewardsConsumer",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "registerRewardsEntity",
      "type": "function",
      "inputs": [
        {
          "name": "requiresApproval",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "renounceRole",
      "type": "function",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "requiresApprovalForAgreements",
      "type": "function",
      "inputs": [
        {
          "name": "entity",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "requiresApproval",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "revokeRole",
      "type": "function",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "rollbackDefaultAdminDelay",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "setRequiresApprovalForRewardsAgreements",
      "type": "function",
      "inputs": [
        {
          "name": "requiresApproval",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "name": "supportsInterface",
      "type": "function",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "trustedForwarder",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "upgradeToAndCall",
      "type": "function",
      "inputs": [
        {
          "name": "newImplementation",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    }
  ] as const;
  