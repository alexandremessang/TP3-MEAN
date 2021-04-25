jQuery(function ($) {

  $(".sidebar-dropdown > a").onclick(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").onclick(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").onclick(function() {
    $(".page-wrapper").addClass("toggled");
  });

});
