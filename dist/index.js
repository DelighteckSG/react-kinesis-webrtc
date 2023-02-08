'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var KVSWebRTC = require('amazon-kinesis-video-streams-webrtc');
var clientKinesisVideo = require('@aws-sdk/client-kinesis-video');
var clientKinesisVideoSignaling = require('@aws-sdk/client-kinesis-video-signaling');
var uuid = require('uuid');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var KVSWebRTC__namespace = /*#__PURE__*/_interopNamespace(KVSWebRTC);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ACTION_ADD_PEER_CONNECTION = "ADD_PEER_CONNECTION";
var ACTION_ADD_PEER_MEDIA = "ADD_PEER_MEDIA";
var ACTION_CLEANUP_PEER = "CLEANUP_PEER";
var ACTION_REMOVE_PEER_CONNECTION = "REMOVE_PEER_CONNECTION";
var ERROR_CHANNEL_ARN_MISSING = "Missing channel ARN";
var ERROR_CONNECTION_OBJECT_NOT_PROVIDED = "Please provide a connection object";
var ERROR_ICE_CANDIDATE_NOT_FOUND = "No ice candidate found";
var ERROR_ICE_SERVERS_RESPONSE = "Could not get ice servers response";
var ERROR_PEER_CONNECTION_LOCAL_DESCRIPTION_REQUIRED = "Could not find local description for peer connection";
var ERROR_PEER_CONNECTION_NOT_INITIALIZED = "Peer connection has not been initialized";
var ERROR_PEER_CONNECTION_NOT_FOUND = "Peer connection not found";
var ERROR_PEER_ID_MISSING = "Peer id is missing.";
var ERROR_SIGNALING_CLIENT_NOT_CONNECTED = "Signaling client connection has not been established";
var PEER_STATUS_ACTIVE = "PEER_STATUS_ACTIVE";
var PEER_STATUS_INACTIVE = "PEER_STATUS_INACTIVE";
var PEER_STATUS_PENDING_MEDIA = "PEER_STATUS_PENDING_MEDIA";

/**
 * @description Fetches ice servers for a signaling channel.
 **/
function useIceServers(config) {
    var channelARN = config.channelARN, channelEndpoint = config.channelEndpoint, _a = config.credentials, _b = _a === void 0 ? {} : _a, _c = _b.accessKeyId, accessKeyId = _c === void 0 ? "" : _c, _d = _b.secretAccessKey, secretAccessKey = _d === void 0 ? "" : _d, region = config.region;
    var _e = react.useState(), error = _e[0], setError = _e[1];
    var _f = react.useState(), iceServers = _f[0], setIceServers = _f[1];
    react.useEffect(function () {
        if (!channelEndpoint) {
            return;
        }
        var kinesisVideoSignalingChannelsClient = new clientKinesisVideoSignaling.KinesisVideoSignalingClient({
            region: region,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey
            },
            endpoint: channelEndpoint
        });
        var getIceServerConfigCommand = new clientKinesisVideoSignaling.GetIceServerConfigCommand({
            ChannelARN: channelARN
        });
        kinesisVideoSignalingChannelsClient
            .send(getIceServerConfigCommand)
            .then(function (getIceServerConfigResponse) {
            var _a;
            if (!getIceServerConfigResponse) {
                throw new Error(ERROR_ICE_SERVERS_RESPONSE);
            }
            if (!getIceServerConfigResponse.IceServerList) {
                throw new Error(ERROR_ICE_SERVERS_RESPONSE);
            }
            var dict = [
                { urls: "stun:stun.kinesisvideo.".concat(region, ".amazonaws.com:443") },
            ];
            (_a = getIceServerConfigResponse === null || getIceServerConfigResponse === void 0 ? void 0 : getIceServerConfigResponse.IceServerList) === null || _a === void 0 ? void 0 : _a.forEach(function (iceServer) {
                if (!iceServer.Uris) {
                    return;
                }
                dict.push({
                    urls: iceServer.Uris,
                    username: iceServer.Username,
                    credential: iceServer.Password
                });
            });
            return dict;
        })
            .then(setIceServers)["catch"](setError);
    }, [accessKeyId, channelARN, channelEndpoint, region, secretAccessKey]);
    return { error: error, iceServers: iceServers };
}

/**
 * @description Opens and returns local media stream. Closes stream on cleanup.
 **/
function useLocalMedia(_a) {
    var _b = _a.audio, audio = _b === void 0 ? true : _b, _c = _a.video, video = _c === void 0 ? true : _c;
    var _d = react.useState(), media = _d[0], setMedia = _d[1];
    var _e = react.useState(), error = _e[0], setError = _e[1];
    react.useEffect(function () {
        var cancelled = false;
        navigator.mediaDevices
            .getUserMedia({ video: video, audio: audio })
            .then(function (stream) {
            if (cancelled) {
                stream.getTracks().forEach(function (track) { return track.stop(); });
                return;
            }
            setMedia(stream);
        })["catch"](setError);
        return function () {
            cancelled = true;
        };
    }, [video, audio]);
    react.useEffect(function () {
        return function cleanup() {
            media === null || media === void 0 ? void 0 : media.getTracks().forEach(function (track) { return track.stop(); });
        };
    }, [media]);
    return { error: error, media: media };
}

/** @description Peer state reducer. */
function usePeerState() {
    function peerReducer(state, action) {
        var _a, _b, _c, _d;
        var itemId = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.id;
        var item = itemId ? state.entities.get(itemId) : undefined;
        switch (action.type) {
            case ACTION_ADD_PEER_CONNECTION:
                if (!((_b = action.payload) === null || _b === void 0 ? void 0 : _b.connection)) {
                    throw new Error(ERROR_CONNECTION_OBJECT_NOT_PROVIDED);
                }
                if (!((_c = action.payload) === null || _c === void 0 ? void 0 : _c.id)) {
                    throw new Error(ERROR_PEER_ID_MISSING);
                }
                state.entities.set(action.payload.id, __assign(__assign({}, action.payload), { status: PEER_STATUS_PENDING_MEDIA }));
                break;
            case ACTION_ADD_PEER_MEDIA:
                if (!item || !itemId) {
                    throw new Error(ERROR_PEER_CONNECTION_NOT_FOUND);
                }
                state.entities.set(itemId, __assign(__assign({}, item), { media: (_d = action.payload) === null || _d === void 0 ? void 0 : _d.media, status: PEER_STATUS_ACTIVE }));
                break;
            case ACTION_REMOVE_PEER_CONNECTION:
                if (!item || !itemId) {
                    throw new Error(ERROR_PEER_CONNECTION_NOT_FOUND);
                }
                state.entities.set(itemId, __assign(__assign({}, item), { status: PEER_STATUS_INACTIVE }));
                break;
            case ACTION_CLEANUP_PEER:
                if (itemId) {
                    state.entities["delete"](itemId);
                }
                break;
            default:
                throw new Error("Action type not found");
        }
        return __assign(__assign({}, state), { entities: new Map(state.entities) });
    }
    return react.useReducer(peerReducer, { entities: new Map() });
}

/**
 * @description Maps AWS KinesisVideo output to readable format.
 **/
function mapSignalingChannelEndpoints(data) {
    var _a;
    var endpointsByProtocol = (_a = data.ResourceEndpointList) === null || _a === void 0 ? void 0 : _a.reduce(function (endpoints, endpoint) {
        if (!endpoint.Protocol) {
            return endpoints;
        }
        endpoints[endpoint.Protocol] =
            endpoint.ResourceEndpoint;
        return endpoints;
    }, {});
    return endpointsByProtocol;
}
/**
 * @description Fetches signaling channel endpoints.
 **/
function useSignalingChannelEndpoints(config) {
    var channelARN = config.channelARN, kinesisVideoClient = config.kinesisVideoClient, role = config.role;
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(), signalingChannelEndpoints = _b[0], setSignalingChannelEndpoints = _b[1];
    if (!channelARN) {
        throw new Error(ERROR_CHANNEL_ARN_MISSING);
    }
    react.useEffect(function () {
        kinesisVideoClient
            .getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ["WSS", "HTTPS"],
                Role: role
            }
        })
            .then(mapSignalingChannelEndpoints)
            .then(setSignalingChannelEndpoints)["catch"](setError);
    }, [channelARN, kinesisVideoClient, role]);
    return { error: error, signalingChannelEndpoints: signalingChannelEndpoints };
}

/**
 * @description Creates and opens a signaling channel. Closes connection on cleanup.
 **/
function useSignalingClient(config) {
    var channelARN = config.channelARN, channelEndpoint = config.channelEndpoint, _a = config.credentials, _b = _a === void 0 ? {} : _a, _c = _b.accessKeyId, accessKeyId = _c === void 0 ? "" : _c, _d = _b.secretAccessKey, secretAccessKey = _d === void 0 ? "" : _d, clientId = config.clientId, kinesisVideoClient = config.kinesisVideoClient, region = config.region, role = config.role;
    var _e = react.useState(), signalingClient = _e[0], setSignalingClient = _e[1];
    var _f = react.useState(), signalingClientError = _f[0], setSignalingClientError = _f[1];
    var systemClockOffset = kinesisVideoClient.config.systemClockOffset;
    /** Create signaling client when endpoints are available. */
    react.useEffect(function () {
        if (!channelEndpoint) {
            return;
        }
        if (!clientId && role === KVSWebRTC__namespace.Role.VIEWER) {
            return;
        }
        setSignalingClient(new KVSWebRTC__namespace.SignalingClient({
            channelARN: channelARN,
            channelEndpoint: channelEndpoint,
            clientId: clientId,
            credentials: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey },
            region: region,
            role: role,
            systemClockOffset: systemClockOffset
        }));
    }, [
        accessKeyId,
        channelARN,
        channelEndpoint,
        clientId,
        region,
        role,
        secretAccessKey,
        systemClockOffset,
    ]);
    /** Handle signaling client lifecycle. */
    react.useEffect(function () {
        function handleSignalingClientError(error) {
            setSignalingClientError(error);
        }
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("error", handleSignalingClientError);
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.open();
        return function cleanup() {
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.close();
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("error", handleSignalingClientError);
        };
    }, [signalingClient]);
    return { error: signalingClientError, signalingClient: signalingClient };
}

/**
 * @description Handles peer connections to a master signaling client.
 **/
function useMasterPeerConnections(config) {
    var channelARN = config.channelARN, credentials = config.credentials, region = config.region;
    var role = KVSWebRTC__namespace.Role.MASTER;
    var kinesisVideoClientRef = react.useRef(new clientKinesisVideo.KinesisVideo({
        region: region,
        credentials: credentials
    }));
    var kinesisVideoClient = kinesisVideoClientRef.current;
    var _a = usePeerState(), peerState = _a[0], dispatch = _a[1];
    var peerStateEntities = peerState.entities;
    var _b = useSignalingChannelEndpoints({
        channelARN: channelARN,
        kinesisVideoClient: kinesisVideoClient,
        role: role
    }), signalingChannelEndpointsError = _b.error, signalingChannelEndpoints = _b.signalingChannelEndpoints;
    var _c = useSignalingClient({
        channelARN: channelARN,
        channelEndpoint: signalingChannelEndpoints === null || signalingChannelEndpoints === void 0 ? void 0 : signalingChannelEndpoints.WSS,
        credentials: credentials,
        kinesisVideoClient: kinesisVideoClient,
        region: region,
        role: role
    }), signalingClientError = _c.error, signalingClient = _c.signalingClient;
    var _d = useIceServers({
        channelARN: channelARN,
        channelEndpoint: signalingChannelEndpoints === null || signalingChannelEndpoints === void 0 ? void 0 : signalingChannelEndpoints.HTTPS,
        credentials: credentials,
        region: region
    }), iceServersError = _d.error, iceServers = _d.iceServers;
    /** Handle peer connections. */
    react.useEffect(function () {
        var peerEntities = Array.from(peerStateEntities.values());
        if (iceServersError ||
            signalingChannelEndpointsError ||
            signalingClientError) {
            return cleanup;
        }
        for (var _i = 0, peerEntities_1 = peerEntities; _i < peerEntities_1.length; _i++) {
            var _a = peerEntities_1[_i], connection = _a.connection, handlers = _a.handlers;
            if (handlers === null || handlers === void 0 ? void 0 : handlers.iceCandidate) {
                connection === null || connection === void 0 ? void 0 : connection.addEventListener("icecandidate", handlers.iceCandidate);
            }
            if (handlers === null || handlers === void 0 ? void 0 : handlers.track) {
                connection === null || connection === void 0 ? void 0 : connection.addEventListener("track", handlers.track);
            }
            if (handlers === null || handlers === void 0 ? void 0 : handlers.iceConnectionStateChange) {
                connection === null || connection === void 0 ? void 0 : connection.addEventListener("iceconnectionstatechange", handlers.iceConnectionStateChange);
            }
        }
        function cleanup() {
            for (var _i = 0, peerEntities_2 = peerEntities; _i < peerEntities_2.length; _i++) {
                var _a = peerEntities_2[_i], id = _a.id, connection = _a.connection, handlers = _a.handlers, media = _a.media, status_1 = _a.status;
                if (handlers === null || handlers === void 0 ? void 0 : handlers.iceCandidate) {
                    connection === null || connection === void 0 ? void 0 : connection.removeEventListener("icecandidate", handlers.iceCandidate);
                }
                if (handlers === null || handlers === void 0 ? void 0 : handlers.track) {
                    connection === null || connection === void 0 ? void 0 : connection.removeEventListener("track", handlers.track);
                }
                if (handlers === null || handlers === void 0 ? void 0 : handlers.iceConnectionStateChange) {
                    connection === null || connection === void 0 ? void 0 : connection.removeEventListener("iceconnectionstatechange", handlers.iceConnectionStateChange);
                }
                if (status_1 === PEER_STATUS_INACTIVE) {
                    connection === null || connection === void 0 ? void 0 : connection.close();
                    media === null || media === void 0 ? void 0 : media.getTracks().forEach(function (track) { return track.stop(); });
                    dispatch({ type: ACTION_CLEANUP_PEER, payload: { id: id } });
                }
            }
        }
        return cleanup;
    }, [
        dispatch,
        iceServersError,
        peerStateEntities,
        signalingChannelEndpointsError,
        signalingClientError,
    ]);
    /** Handle signaling client events. */
    react.useEffect(function () {
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("open", handleOpen);
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("sdpOffer", handleSdpOffer);
        function handleOpen() {
        }
        function handleSdpOffer(offer, id) {
            return __awaiter(this, void 0, void 0, function () {
                function handleIceCandidate(_a) {
                    var candidate = _a.candidate;
                    if (candidate) {
                        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.sendIceCandidate(candidate, id);
                    }
                }
                function handleIceConnectionStateChange() {
                    if (connection.iceConnectionState === "disconnected") {
                        dispatch({ type: ACTION_REMOVE_PEER_CONNECTION, payload: { id: id } });
                    }
                }
                function handleTrack(_a) {
                    var _b = _a.streams, streams = _b === void 0 ? [] : _b;
                    dispatch({
                        type: ACTION_ADD_PEER_MEDIA,
                        payload: { id: id, media: streams[0] }
                    });
                }
                var connection, handlers, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            connection = new RTCPeerConnection({
                                iceServers: iceServers,
                                iceTransportPolicy: "all"
                            });
                            handlers = {
                                iceCandidate: handleIceCandidate,
                                iceConnectionStateChange: handleIceConnectionStateChange,
                                track: handleTrack
                            };
                            dispatch({
                                type: ACTION_ADD_PEER_CONNECTION,
                                payload: { id: id, connection: connection, handlers: handlers }
                            });
                            return [4 /*yield*/, connection.setRemoteDescription(offer)];
                        case 1:
                            _c.sent();
                            _b = (_a = connection).setLocalDescription;
                            return [4 /*yield*/, connection.createAnswer({
                                    offerToReceiveAudio: true,
                                    offerToReceiveVideo: true
                                })];
                        case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 3:
                            _c.sent();
                            if (connection.localDescription) {
                                signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.sendSdpAnswer(connection.localDescription, id);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        return function cleanup() {
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("open", handleOpen);
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("sdpOffer", handleSdpOffer);
        };
    }, [dispatch, iceServers, signalingClient]);
    return {
        error: signalingChannelEndpointsError || signalingClientError || iceServersError,
        peerEntities: peerState.entities
    };
}
/**
 * @description Opens a master connection using an existing signaling channel.
 **/
function useMaster(config) {
    var channelARN = config.channelARN, credentials = config.credentials, region = config.region, _a = config.media, media = _a === void 0 ? { audio: true, video: true } : _a;
    var _b = useLocalMedia(media), mediaError = _b.error, localMedia = _b.media;
    var _c = useMasterPeerConnections({
        channelARN: channelARN,
        credentials: credentials,
        localMedia: localMedia,
        region: region
    }), peerConnectionsError = _c.error, peerEntities = _c.peerEntities;
    /** Send local media stream to remote peers. */
    react.useEffect(function () {
        var _loop_1 = function (connection, status_2) {
            if (status_2 === PEER_STATUS_PENDING_MEDIA) {
                localMedia === null || localMedia === void 0 ? void 0 : localMedia.getTracks().forEach(function (track) {
                    connection === null || connection === void 0 ? void 0 : connection.addTrack(track, localMedia);
                });
            }
        };
        for (var _i = 0, _a = Array.from(peerEntities.values()); _i < _a.length; _i++) {
            var _b = _a[_i], connection = _b.connection, status_2 = _b.status;
            _loop_1(connection, status_2);
        }
    }, [peerEntities, localMedia]);
    return {
        error: mediaError || peerConnectionsError,
        localMedia: localMedia,
        peers: Array.from(peerEntities.values()).filter(function (_a) {
            var status = _a.status;
            return status === PEER_STATUS_ACTIVE;
        })
    };
}

/**
 * @description Handles peer connection to a viewer signaling client.
 **/
function useViewerPeerConnection(config) {
    var channelARN = config.channelARN, credentials = config.credentials, region = config.region;
    var role = KVSWebRTC__namespace.Role.VIEWER;
    var clientId = react.useRef();
    var kinesisVideoClientRef = react.useRef(new clientKinesisVideo.KinesisVideo({
        region: region,
        credentials: credentials
    }));
    var kinesisVideoClient = kinesisVideoClientRef.current;
    var _a = react.useState(), peerConnection = _a[0], setPeerConnection = _a[1];
    var _b = react.useState(), peerMedia = _b[0], setPeerMedia = _b[1];
    var _c = useSignalingChannelEndpoints({
        channelARN: channelARN,
        kinesisVideoClient: kinesisVideoClient,
        role: role
    }), signalingChannelEndpointsError = _c.error, signalingChannelEndpoints = _c.signalingChannelEndpoints;
    var _d = useIceServers({
        channelARN: channelARN,
        channelEndpoint: signalingChannelEndpoints === null || signalingChannelEndpoints === void 0 ? void 0 : signalingChannelEndpoints.HTTPS,
        credentials: credentials,
        region: region
    }), iceServersError = _d.error, iceServers = _d.iceServers;
    var _e = useSignalingClient({
        channelARN: channelARN,
        channelEndpoint: signalingChannelEndpoints === null || signalingChannelEndpoints === void 0 ? void 0 : signalingChannelEndpoints.WSS,
        clientId: clientId.current,
        credentials: credentials,
        kinesisVideoClient: kinesisVideoClient,
        region: region,
        role: role
    }), signalingClientError = _e.error, signalingClient = _e.signalingClient;
    /** Set the client id. */
    react.useEffect(function () {
        clientId.current = uuid.v4();
    }, [clientId]);
    /** Initialize the peer connection with ice servers. */
    react.useEffect(function () {
        if (iceServers) {
            setPeerConnection(new RTCPeerConnection({
                iceServers: iceServers,
                iceTransportPolicy: "all"
            }));
        }
    }, [iceServers]);
    /** Handle signaling client and remote peer lifecycle. */
    react.useEffect(function () {
        if (!peerConnection) {
            return;
        }
        function handleOpen() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!(peerConnection === null || peerConnection === void 0)) return [3 /*break*/, 1];
                            _a = void 0;
                            return [3 /*break*/, 3];
                        case 1:
                            _c = (_b = peerConnection).setLocalDescription;
                            return [4 /*yield*/, (peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.createOffer({
                                    offerToReceiveAudio: true,
                                    offerToReceiveVideo: true
                                }))];
                        case 2:
                            _a = _c.apply(_b, [_d.sent()]);
                            _d.label = 3;
                        case 3: return [4 /*yield*/, (_a)];
                        case 4:
                            _d.sent();
                            if (!(peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.localDescription)) {
                                throw new Error(ERROR_PEER_CONNECTION_LOCAL_DESCRIPTION_REQUIRED);
                            }
                            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.sendSdpOffer(peerConnection.localDescription);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function handleSdpAnswer(answer) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!peerConnection) {
                                throw new Error(ERROR_PEER_CONNECTION_NOT_INITIALIZED);
                            }
                            return [4 /*yield*/, peerConnection.setRemoteDescription(answer)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function handleSignalingChannelIceCandidate(candidate) {
            if (!candidate) {
                throw new Error(ERROR_ICE_CANDIDATE_NOT_FOUND);
            }
            if (!peerConnection) {
                throw new Error(ERROR_PEER_CONNECTION_NOT_INITIALIZED);
            }
            peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.addIceCandidate(candidate);
        }
        function handlePeerIceCandidate(_a) {
            var candidate = _a.candidate;
            if (!signalingClient) {
                throw new Error(ERROR_SIGNALING_CLIENT_NOT_CONNECTED);
            }
            if (candidate) {
                signalingClient.sendIceCandidate(candidate);
            }
        }
        function handlePeerTrack(_a) {
            var _b = _a.streams, streams = _b === void 0 ? [] : _b;
            setPeerMedia(streams[0]);
        }
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("open", handleOpen);
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("sdpAnswer", handleSdpAnswer);
        signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.on("iceCandidate", handleSignalingChannelIceCandidate);
        peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.addEventListener("icecandidate", handlePeerIceCandidate);
        peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.addEventListener("track", handlePeerTrack);
        return function cleanup() {
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("open", handleOpen);
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("sdpAnswer", handleSdpAnswer);
            signalingClient === null || signalingClient === void 0 ? void 0 : signalingClient.off("iceCandidate", handleSignalingChannelIceCandidate);
            peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.removeEventListener("icecandidate", handlePeerIceCandidate);
            peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.removeEventListener("track", handlePeerTrack);
            peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.close();
        };
    }, [peerConnection, signalingClient]);
    /** Handle peer media lifecycle. */
    react.useEffect(function () {
        return function cleanup() {
            peerMedia === null || peerMedia === void 0 ? void 0 : peerMedia.getTracks().forEach(function (track) { return track.stop(); });
        };
    }, [peerMedia]);
    return {
        error: signalingChannelEndpointsError || iceServersError || signalingClientError,
        peer: {
            id: clientId.current,
            connection: peerConnection,
            media: peerMedia,
            status: PEER_STATUS_ACTIVE
        }
    };
}
/**
 * @description Opens a viewer connection to an active master signaling channel.
 **/
function useViewer(config) {
    var channelARN = config.channelARN, credentials = config.credentials, region = config.region, _a = config.media, media = _a === void 0 ? { audio: true, video: true } : _a;
    var _b = useLocalMedia(media), streamError = _b.error, localMedia = _b.media;
    var _c = useViewerPeerConnection({
        channelARN: channelARN,
        credentials: credentials,
        region: region
    }), peerConnectionError = _c.error, peer = _c.peer;
    /** Send local media stream to remote peer. */
    react.useEffect(function () {
        localMedia === null || localMedia === void 0 ? void 0 : localMedia.getTracks().forEach(function (track) { var _a; return (_a = peer.connection) === null || _a === void 0 ? void 0 : _a.addTrack(track, localMedia); });
    }, [localMedia, peer.connection]);
    return { error: streamError || peerConnectionError, localMedia: localMedia, peer: peer };
}

exports.useLocalMedia = useLocalMedia;
exports.useMaster = useMaster;
exports.useViewer = useViewer;
//# sourceMappingURL=index.js.map
