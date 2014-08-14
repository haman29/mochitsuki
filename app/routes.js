module.exports = function(match) {
  match('',                   'home#index');
  match('repos',              'repos#index');
  match('repos/:owner/:name', 'repos#show');
  match('users'       ,       'users#index');
  match('users/:login',       'users#show');
  match('users_lazy/:login',  'users#show_lazy');
  match('rooms',              'rooms#index');
  match('rooms/:room_key',    'rooms#show');
};
