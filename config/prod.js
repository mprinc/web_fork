module.exports = {
  name: 'default-localhost',
  listeningPort: 8088,
  mappings: {
    // http://superuser.com/questions/152146/how-to-alias-a-hostname-on-mac-osx
    'api.knalledge.org': {
      options: {
        target: 'http://localhost:8001'
      }
    },
    'topichat.knalledge.org': {
      options: {
        target: 'ws://127.0.0.1:8002',
        ws: true
      }
    },
    'default': {
      aliases: ['knalledge.org', 'www.knalledge.org', '127.0.0.1', 'localhost'],
      options: {
        target: 'http://localhost:8000'
      }
    }
  }
};
