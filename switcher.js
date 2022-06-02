function switch_css(css) {
  css_link.href = css + ".css";
}

function capitalize(s) {
  u = s.replace(/^(.)/, function(_, l){
    return l.toUpperCase();
  });
  return u;
}

function on_css_load() {
  var bgColor = getComputedStyle(document.body).backgroundColor;
  if (bgColor.match(/^rgba\(.*\)/) ) bgColor = 'white';
  switcher.style.backgroundColor = bgColor;
}

function inline_switcher() {
  switcher = document.getElementById("switcher");
  frameworks_array = frameworks.split(",");
  select_open = '\n        <select name="switcher_dropdown" id="switcher_dropdown" accesskey="s" onchange="switch_css(this.value)">\n';
  dropdown = select_open;
  for (i = 0; i < frameworks_array.length; i++) {
    f = frameworks_array[i];
    framework_name = capitalize(f);
    option = '          <option value="' + f + '">' + framework_name + ' CSS</option>\n';
    dropdown = dropdown + option;
  }
  select_close = '        </select>\n      '
  dropdown = dropdown + select_close;
  switcher.innerHTML = dropdown;
}

function add_switcher() {
//   css_link = document.getElementsByTagName("link")[0];
  css_link = document.getElementsByClassName("pygments-css")[0];
  if (css_link == undefined) {
    head = document.getElementsByTagName('head')[0];
    css_link = document.createElement('link');
    css_link.rel="stylesheet";
    css_link.type="text/css";
    css_link.class="pygments-css";
    css_link.href=frameworks.split(",")[0] + ".css";
    head.appendChild(css_link);
  }

  var new_div = document.createElement('div');
  new_div.id = 'switcher';
  new_div.innerHTML = '      <div>&nbsp;</div>\n      <script type="text/javascript">inline_switcher();</script>';
  document.body.prepend(new_div);
  document.body.style.paddingLeft = "24px";

  inline_switcher();

  css_link.onload = on_css_load;
}

var frameworks = "abap,algol_nu,algol,arduino,autumn,borland,bw,colorful,default,emacs,friendly,fruity,gruvbox-dark,gruvbox-light,igor,inkpot,lovelace,manni,material,monokai,murphy,native,paraiso-dark,paraiso-light,pastie,perldoc,rainbow_dash,rrt,sas,solarized-dark,solarized-light,stata-dark,stata-light,stata,tango,trac,vim,vs,xcode,zenburn";

add_switcher();
