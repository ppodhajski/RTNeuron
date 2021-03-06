/* Copyright (c) 2006-2018, École Polytechnique Fédérale de Lausanne (EPFL) /
 *                           Blue Brain Project and
 *                          Universidad Politécnica de Madrid (UPM)
 *                          Juan Hernando <juan.hernando@epfl.ch>
 *
 * This file is part of RTNeuron <https://github.com/BlueBrain/RTNeuron>
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License version 3.0 as published
 * by the Free Software Foundation.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this library; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

#version 410

$DEFINES

#ifdef USE_POINT_SIZE_UNIFORM
uniform float pointSize;
#else
in float pointSize;
#endif

in vec4 color;

float distance2 = -1;
void _check()
{
    if (distance2 == -1)
        distance2 = dot(gl_PointCoord - 0.5, gl_PointCoord - 0.5);
    if (distance2 > 0.25)
        discard;
#ifdef CIRCLES
    if (distance2 < 0.25 - 1 / pointSize)
        discard;
#endif
}

vec4 shadeFragment()
{
    _check();
    return color;
}

float fragmentDepth()
{
    _check();
    return gl_FragCoord.z;
}

float fragmentAlpha()
{
    _check();
    return color.a;
}
