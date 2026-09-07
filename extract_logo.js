const fs = require('fs');
const html = fs.readFileSync('public/owllow_logo_animation.html', 'utf8');
const match = html.match(/src="data:image\/png;base64,([^"]+)"/);
if (match) {
  fs.writeFileSync('public/logo_animated.png', Buffer.from(match[1], 'base64'));
  console.log('Extracted logo successfully!');
} else {
  console.log('Could not find base64 image in HTML.');
}
