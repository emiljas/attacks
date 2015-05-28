drop database attacks;

create database attacks charset=utf8;

use attacks;

create table user (
  id int not null auto_increment,
  name varchar(45) not null,
  primary key (id)
);

create table note (
  id int not null auto_increment,
  title varchar(400) not null,
  content varchar(2000) not null,
  colorRGB varchar(6) not null,
  userId int,
  primary key (id),
  foreign key (userId)
    references user(id)
    on delete cascade
);

insert into user(name) values("Lena");
insert into user(name) values("Oliwia");

set @lenaUserId = (select id from user where name = "Lena");
set @yellow = "FF9";
insert into note(title, content, colorRGB, userId) values(
  "lista zakupów 20.05",
  "cukier, kawa, herbatniki",
  @yellow,
  @lenaUserId
);
insert into note(title, content, colorRGB, userId) values(
  "pizza składniki",
  "<ul>
  <li>5 łyżek oliwy z oliwek</li>
  <li>1/4 łyżeczki soli</li>
  <li>2 łyżki ziaren różowego pieprzu</li>
  <li>40 pomidorków koktajlowych</li>
  </ul>",
  @yellow,
  @lenaUserId
);
insert into note(title, content, colorRGB, userId) values(
  "przypomnienie",
  "kupić Oliwii prezent urodzinowy",
  @yellow,
  @lenaUserId
);

set @oliwiaUserId = (select id from user where name = "Oliwia");
set @red = "F99";
insert into note(title, content, colorRGB, userId) values(
  "Lena..",
  "Kiedy ona wreszcie odda moją szminkę.. I tak nic jej nie pomoże..",
  @red,
  @oliwiaUserId
);
insert into note(title, content, colorRGB, userId) values(
  "hasełeczko do fejsbuczuńka",
  "1234567",
  @red,
  @oliwiaUserId
);
